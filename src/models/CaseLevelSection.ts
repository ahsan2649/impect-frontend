interface CaseLevelSection {
  id?: number;
  case_id: number;
  level_id: number;
  name: string;
  created_at?: Date;
  current_section?: number;
  feedbacks?: Feedback[];
}
