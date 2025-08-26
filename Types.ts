import { type PortableTextBlock } from "@portabletext/react"

export interface PreviewArtPiece {
  _id: string;
  title: string;
  date: string;
  slug: {
    current: string;
  };
  images: object[];
}

export interface FullPiece {
  title: string;
  date: string;
  description: PortableTextBlock;
  images: object[];
}
