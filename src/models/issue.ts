export interface Issue {
  id: number;
  key: string;
  summary: string;
  status?: string;
  issue_type?: string;
  labels?: string;
  resolution?: string;

  manufacturer?: string;
  model?: string;
  serial_number?: string;
  tier_of_equip?: string;
  location?: string;
  room_num?: string;

  assignee_name?: string;
  assignee_displayName?: string;
  assignee_emailAddress?: string;
  assignee_avatarUrl?: string;
}

export interface Printer extends Issue {
  type_of_ink: string;
  num_of_trays: string;
}

export interface Computer extends Issue {
  hostname: string;
  cpu_model: string;
  ram: string;
  hdd_size: string;
  graphics_card: string;
  lan_mac_address: string;
  wlan_mac_address: string;
}
