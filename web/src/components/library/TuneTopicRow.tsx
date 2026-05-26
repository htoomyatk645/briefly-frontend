import {
  TUNE_LEVEL_MAX,
  TUNE_LEVEL_MIN,
  TUNE_LEVEL_STEP,
  tuneLevelAriaText,
  type TuneTopic,
} from './tuneFeedTypes'

export type TuneTopicRowProps = {
  topic: TuneTopic
  value: number
  onChange: (level: number) => void
}

export function TuneTopicRow({ topic, value, onChange }: TuneTopicRowProps) {
  return (
    <div className="tune-topic-row">
      <div className="tune-topic-row__head">
        <span className="tune-topic-row__name">{topic.label}</span>
        <span className="tune-topic-row__recent">recent: {topic.recentClips} clips</span>
      </div>
      <input
        type="range"
        className="tune-topic-row__slider"
        min={TUNE_LEVEL_MIN}
        max={TUNE_LEVEL_MAX}
        step={TUNE_LEVEL_STEP}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={`Tune ${topic.label}`}
        aria-valuemin={TUNE_LEVEL_MIN}
        aria-valuemax={TUNE_LEVEL_MAX}
        aria-valuenow={value}
        aria-valuetext={tuneLevelAriaText(value)}
      />
    </div>
  )
}
