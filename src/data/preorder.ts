// ─────────────────────────────────────────────────────────────────
// PRE-ORDER CONFIGURATION
// preOrderEnabled: true = show Pre-Order button for this event
// To disable pre-ordering for a specific event, set to false
// ─────────────────────────────────────────────────────────────────

export const preOrderConfig: Record<string, boolean> = {
  'slo-farmers-market-thu-jun-04': true,
  'slo-farmers-market-thu-jun-11': true,
  'slo-farmers-market-thu-jun-18': true,
  'slo-farmers-market-thu-jun-25': true,
  'slo-farmers-market-thu-jul-02': true,
}

// Generate 15-minute pickup windows between start and 1 hour before end
export function generatePickupWindows(startTime: string, endTime: string): string[] {
  const parseTime = (t: string) => {
    const parts = t.split(' ')
    const period = parts[1] ?? 'AM'
    const timeParts = (parts[0] ?? '0:00').split(':').map(Number)
    let h = timeParts[0] ?? 0
    const minutes = timeParts[1] ?? 0
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return h * 60 + minutes
  }

  const formatTime = (minutes: number) => {
    let h = Math.floor(minutes / 60)
    const m = minutes % 60
    const period = h >= 12 ? 'PM' : 'AM'
    if (h > 12) h -= 12
    if (h === 0) h = 12
    return `${h}:${m.toString().padStart(2, '0')} ${period}`
  }

  const start = parseTime(startTime)
  const end = parseTime(endTime) - 60 // close 1 hour before event ends

  const windows: string[] = []
  for (let t = start; t < end; t += 15) {
    windows.push(`${formatTime(t)} – ${formatTime(t + 15)}`)
  }

  return windows
}

export const menuOptions = [
  'The Classic — Dr. Pepper, Vanilla, Coconut Cream',
  'Dirty Float — Root Beer, Vanilla, Vanilla Cream',
  'Lime in the Coconut — Diet Coke, Lime, Coconut, Coconut Cream',
  'The Squeeze — Orange Fanta, Vanilla, Cream',
  'Pink Wave — Fresca, Peach, Raspberry, Coconut',
  'Razz Rush — Coca-Cola, Raspberry, Coconut, Vanilla Cream',
  'Fruity Fizz — Sprite, Raspberry, Strawberry',
  'Galaxy — Sprite, Blue Raspberry, Cherry',
  'Breeze (Bomber) — Red Bull, Blue Raspberry, Lime, Coconut Cream',
  'Island Time (Bomber) — Red Bull, Pineapple, Vanilla Cream',
  'Peach Pom (Bomber) — Red Bull, Pomegranate, Peach, Sweet Cream',
  'Jolly Rancher (Bomber) — Red Bull, Watermelon, Strawberry, Sweet Cream',
  'Cherry Pie (Bomber) — Red Bull, Cherry, Vanilla',
]

export const baseOptions = [
  'Coca-Cola', 'Diet Coca-Cola', 'Dr. Pepper', 'Diet Dr. Pepper',
  'Fresca', 'Orange Fanta', 'Root Beer', 'Sprite', 'Red Bull',
]

export const syrupOptions = [
  'Blue Raspberry', 'Cherry', 'Coconut', 'Lime', 'Mango', 'Peach',
  'Pineapple', 'Pomegranate', 'Raspberry', 'Sour Candy', 'Strawberry',
  'Sugar Free Vanilla', 'Vanilla', 'Watermelon',
]

export const creamerOptions = [
  'None', 'Sweet & Creamy', 'Coconut Cream', 'French Vanilla',
]
