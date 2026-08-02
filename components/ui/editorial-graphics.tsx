import { cn } from '@/lib/utils'

type ModuleVariant = 'agent' | 'prompt' | 'evaluation' | 'workflow'

const labels: Record<ModuleVariant, { index: string; title: string; code: string }> = {
  agent: { index: '01', title: 'AJAN MÜHENDİSLİĞİ', code: 'ORCHESTRATE / TOOL / MEMORY' },
  prompt: { index: '02', title: 'PROMPT SİSTEMLERİ', code: 'CONTEXT / TEST / REFINE' },
  evaluation: { index: '03', title: 'EVALUATION', code: 'TRACE / SCORE / VERIFY' },
  workflow: { index: '04', title: 'İŞ AKIŞI TASARIMI', code: 'INPUT / PROCESS / OUTPUT' },
}

export function EditorialMark({ className }: { className?: string }) {
  return (
    <svg className={cn('text-current', className)} viewBox='0 0 180 180' fill='none' aria-hidden='true'>
      <circle cx='90' cy='90' r='52' stroke='currentColor' strokeWidth='1' />
      <circle cx='90' cy='90' r='19' stroke='currentColor' strokeWidth='1' />
      <path d='M90 8v164M8 90h164M32 32l116 116M148 32 32 148' stroke='currentColor' strokeWidth='1' />
      <path d='m90 20 7 63 63 7-63 7-7 63-7-63-63-7 63-7 7-63Z' fill='currentColor' fillOpacity='.12' stroke='currentColor' />
      <path d='M8 24V8h16M156 8h16v16M172 156v16h-16M24 172H8v-16' stroke='currentColor' strokeWidth='2' />
    </svg>
  )
}

export function ModuleCover({ variant, className }: { variant: ModuleVariant; className?: string }) {
  const item = labels[variant]
  const nodes = variant === 'prompt' ? 5 : variant === 'evaluation' ? 4 : 6

  return (
    <div className={cn('relative aspect-[16/10] overflow-hidden border border-border bg-[#1c1a17] text-[#f0ece3]', className)}>
      <svg viewBox='0 0 800 500' className='absolute inset-0 h-full w-full' fill='none' aria-hidden='true'>
        <path d='M48 48H752V452H48z' stroke='currentColor' strokeOpacity='.18' />
        <path d='M0 90H800M0 250H800M0 410H800M130 0V500M400 0V500M670 0V500' stroke='currentColor' strokeOpacity='.08' />
        <circle cx='400' cy='248' r='112' stroke='#B4472D' strokeWidth='2' />
        <circle cx='400' cy='248' r='64' stroke='currentColor' strokeOpacity='.42' />
        {Array.from({ length: nodes }).map((_, index) => {
          const angle = (index / nodes) * Math.PI * 2 - Math.PI / 2
          const x = 400 + Math.cos(angle) * 112
          const y = 248 + Math.sin(angle) * 112
          return (
            <g key={index}>
              <path d={`M400 248L${x} ${y}`} stroke='currentColor' strokeOpacity='.28' />
              <rect x={x - 13} y={y - 13} width='26' height='26' fill='#1c1a17' stroke='#B4472D' />
            </g>
          )
        })}
        {variant === 'evaluation' && (
          <path d='m353 251 31 31 68-77' stroke='#F0ECE3' strokeWidth='8' />
        )}
        {variant === 'prompt' && (
          <path d='M344 226h112M344 248h84M344 270h102' stroke='#F0ECE3' strokeWidth='5' />
        )}
        {variant === 'workflow' && (
          <path d='M340 248h120m-22-22 22 22-22 22' stroke='#F0ECE3' strokeWidth='7' />
        )}
        {variant === 'agent' && (
          <circle cx='400' cy='248' r='18' fill='#B4472D' />
        )}
      </svg>
      <div className='absolute inset-x-0 top-0 flex items-center justify-between p-4 font-mono text-[10px] tracking-[0.16em] text-white/55 sm:p-5'>
        <span>{item.index} / MODÜL</span>
        <span>{item.code}</span>
      </div>
      <div className='absolute inset-x-0 bottom-0 border-t border-white/15 bg-[#1c1a17]/90 p-4 sm:p-5'>
        <p className='font-mono text-xs tracking-[0.12em] text-[#d66a4c]'>{item.title}</p>
      </div>
    </div>
  )
}
