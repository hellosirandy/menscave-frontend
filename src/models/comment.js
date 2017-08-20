export class Comment {
  constructor(
    content: string,
    commenter: string,
    updateTime: number,
    reply: { updateTime: number, content: string },
    articleCommentKey: string,
  ) {
    this.content = content;
    this.commenter = commenter;
    this.updateTime = updateTime;
    this.reply = reply;
    this.articleCommentKey = articleCommentKey;
  }

  formatDate(d) {
    let date = new Date(d);
    return `${this.processDateString(date.getMonth()+1)}/${this.processDateString(date.getDate())} ${this.processDateString(date.getHours())}:${this.processDateString(date.getMinutes())}`;
  }

  processDateString(number) {
    return number.toString().length === 2 ? number : `0${number}`;
  }
}
