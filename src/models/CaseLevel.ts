interface CaseLevel {
  id?: number;
  case_id: number;
  name: string;
  created_at?: Date;
  current_section?: number;
  sections?: CaseLevelSection[];
}
