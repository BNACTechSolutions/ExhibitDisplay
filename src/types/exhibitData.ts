import { Url } from "next/dist/shared/lib/router/router";

export type ExhibitDataProps = {
  _id: string; // Unique ID for the exhibit
  title: string; // Default title of the exhibit
  description: string; // Default description of the exhibit
  titleImage: string; // URL for the main exhibit image
  images: string[]; // Array of additional exhibit image URLs
  code: string; // Unique exhibit code
  clientId: string; // ID of the client associated with the exhibit
  translations: TranslationProps[]; // Array of translations for the exhibit
  createdAt: string; // ISO string representing creation date
  __v: number; // Version number (used by some databases like MongoDB)
  advertisementImage: string; // URL for the advertisement image
  islVideo: string;
};

export type TranslationProps = {
  audioUrls: {
    title: string;
    description: string;
  };
  language: string;
  title: string;
  description: string;
  _id: string;
};

type LandingPage = {
  _id: string;
  clientId: string;
  displayImage: string;
  title: string;
  description: string;
  uniqueUrl: string;
  qrCode: string;
  translations: TranslationProps[];
  __v: number;
};

type LandingResponse = {
  landingPage: LandingPage;
};
