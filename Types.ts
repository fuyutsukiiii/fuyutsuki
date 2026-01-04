import { type PortableTextBlock } from "@portabletext/react";

export interface PreviewArtPiece {
  _id: string;
  title: string;
  date: string;
  slug: {
    current: string;
  };
  images: SanityImage[];
}

export interface HomePiece {
  _id: string;
  title: string;
  images: SanityImage[];
}

export interface FullPiece {
  title: string;
  date: string;
  description: PortableTextBlock;
  images: SanityImage[];
}

export interface FullPieceWithSlug {
  title: string;
  date: string;
  description: PortableTextBlock;
  images: SanityImage[];
  slug: {
    current: string;
  };
}

interface SanityImage {
  _key: string,
  _type: string,
  asset: object;
}