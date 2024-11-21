export function trimText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}
  
export function getFirstTwoSentences(paragraph: string): string {
    const sentences = paragraph.match(/[^.!?]+[.!?]*/g);
  
    if (sentences && sentences.length > 0) {
      return sentences.slice(0, 2).join(' ').trim();
    }
    
    return '';
  }