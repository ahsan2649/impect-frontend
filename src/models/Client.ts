interface Client {
  id: number;
  ipaddress: string;
  port: string;
  registered_case_id: number;
  current_section_id: number;
  current_level_id: number;
  connected_at: Date;

  case?: Case;
}
