export interface DrinkOrder {
  type: 'menu' | 'custom'
  menuItem?: string
  base?: string
  syrups?: string[]
  creamer?: string
  notes?: string
}

export interface PreOrderSubmission {
  eventId: string
  eventTitle: string
  eventDate: string
  pickupWindow: string
  customerName: string
  customerEmail: string
  drinks: DrinkOrder[]
}
