declare type Feedback = {
    id: number,
    user_id: number,
    username: string
    status: string,
    title: string,
    category: string,
    details: string,
    comment_count?: number,
    upvote_count?: number
}
