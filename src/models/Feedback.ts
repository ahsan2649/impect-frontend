interface Feedback {
  id: number;
  feedback_type_id: number;
  feedback_level_id: number;
  value: string;
  description: string;
  created_at: Date;

  feedback_type?: FeedbackType;
  feedback_level?: FeedbackLevel;
}
