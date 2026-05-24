export const formatElapsed = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatRemaining = (elapsed: number, duration: number): string => {
  const remaining = Math.max(duration - elapsed, 0);
  return `-${formatElapsed(remaining)}`;
};
