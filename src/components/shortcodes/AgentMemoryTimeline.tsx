interface AgentMemoryTimelineProps {
  className?: string
  /** Override the demo video source. Defaults to the session-bridge clip. */
  videoSrc?: string
  poster?: string
}

const DEFAULT_VIDEO_SRC = 'https://static.pingcap.com/images/cda86203-session-bridge.mp4'

export function AgentMemoryTimeline({
  className,
  videoSrc = DEFAULT_VIDEO_SRC,
  poster,
}: AgentMemoryTimelineProps) {
  return (
    <div className={className}>
      <div className="rounded-2xl border border-gray-200 border-l-[4px] border-l-brand-violet-bg bg-gray-50 p-6 shadow-sm">
        <div className="overflow-hidden rounded-xl bg-black">
          <video
            src={videoSrc}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="block h-auto w-full"
          />
        </div>
        <div className="mt-4 rounded-full border border-gray-200 bg-white px-4 py-3 font-mono text-[13px] text-gray-600">
          Durable layer onState survives a restart
        </div>
        <p className="mt-4 text-base leading-relaxed text-gray-500">
          Short-term memory clears when a session ends. Persistent memory carries context into the
          next session.
        </p>
      </div>
    </div>
  )
}
