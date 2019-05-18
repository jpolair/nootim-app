export interface Comment {
    messageId: string;
    ownerMessage: string;
    ownerComment: string;
    content: string;
    date: Date;
}

export interface CommentGet {
    messageId: string;
    ownerMessage: UserIdentity;
    ownerComment: UserIdentity;
    content: string;
    date: Date;
}

export interface UserIdentity {
    lastname: string;
    firstname: string;
}
