declare namespace Intl {
  class Segmenter {
    constructor(
      locales?: string | string[],
      options?: { granularity?: 'grapheme' | 'word' | 'sentence' }
    );

    segment(input: string): Iterable<{ segment: string }>;
  }
}
