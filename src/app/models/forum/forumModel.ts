import { Timestamp } from "rxjs";

export class ForumModel{
    doc: String;
    subject: String;
    description: String;
    create_by: String;
    create_time: Date;
    update_by: String;
    update_time: Date;
    category_id: String;
}