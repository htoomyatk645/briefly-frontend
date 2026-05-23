export type PodcastNetwork = {
  id: string
  name: string
  initials: string
  color: string
}

export const PODCAST_NETWORKS: PodcastNetwork[] = [
  { id: 'npr', name: 'NPR', initials: 'NPR', color: '#1a1a1a' },
  { id: 'nyt', name: 'The New York Times', initials: 'NYT', color: '#1a1a1a' },
  { id: 'gimlet', name: 'Gimlet', initials: 'GM', color: '#2d6a4f' },
  { id: 'wondery', name: 'Wondery', initials: 'W', color: '#7b2cbf' },
  { id: 'iheartradio', name: 'iHeartRadio', initials: 'iH', color: '#c9184a' },
  { id: 'barstool', name: 'Barstool Sports', initials: 'BS', color: '#0077b6' },
  { id: 'parcast', name: 'Parcast', initials: 'PC', color: '#6a4c93' },
  { id: 'pushkin', name: 'Pushkin', initials: 'PK', color: '#e85d04' },
  { id: 'serial', name: 'Serial Productions', initials: 'SP', color: '#264653' },
  { id: 'crooked', name: 'Crooked Media', initials: 'CM', color: '#118ab2' },
  { id: 'ringer', name: 'The Ringer', initials: 'TR', color: '#e63946' },
  { id: 'vox', name: 'Vox Media', initials: 'VX', color: '#f4a261' },
  { id: 'relay', name: 'Relay FM', initials: 'RF', color: '#5f0f40' },
  { id: 'earwolf', name: 'Earwolf', initials: 'EW', color: '#06d6a0' },
  { id: 'radiotopia', name: 'Radiotopia', initials: 'RT', color: '#ef476f' },
  { id: 'luminary', name: 'Luminary', initials: 'LM', color: '#ffd166' },
  { id: 'slate', name: 'Slate', initials: 'SL', color: '#073b4c' },
  { id: 'maximum', name: 'Maximum Fun', initials: 'MF', color: '#e76f51' },
]

export const MIN_NETWORK_SELECTIONS = 2
