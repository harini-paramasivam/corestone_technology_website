/** Static option lists shared by the Request Demo form. */

export const BUSINESS_TYPE_OPTIONS = [
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'private_limited', label: 'Private Limited Company' },
  { value: 'llp', label: 'LLP' },
  { value: 'other', label: 'Other' },
]

export const DEMO_MODE_OPTIONS = [
  { value: 'online', label: 'Online (Video Call)' },
  { value: 'in_person', label: 'In-Person Visit' },
  { value: 'phone_call', label: 'Phone Call' },
]

export const DEMO_TIME_SLOTS = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:30', label: '11:30 AM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:30', label: '2:30 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:30', label: '5:30 PM' },
  { value: 'custom', label: 'Other / Specify Custom Time' },
]

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Puducherry', 'Jammu and Kashmir', 'Ladakh',
  'Chandigarh',
].map((name) => ({ value: name, label: name }))
