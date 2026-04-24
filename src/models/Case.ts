interface Case {
  id: number;
  case_unique_id: string;
  name: string;
  description: string;
  active: string;
  created_at: Date;

  levels?: CaseLevel[];
  clients?: Client[];
}
