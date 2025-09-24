"use client";

import { useMemo } from "react";
import { ThemeSettings } from "../types"; // import your ThemeSettings type
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// interface ApiTheme {
//    id: string;
//    name: string;
//    preview: string;
//    backgroundColor: string;
//    backgroundType: "solid" | "gradient" | "image" | "glass";
//    primaryColor: string;
//    textColor: string;
//    secondaryText: string;
//    cardBackground: string;
//    cardBorder: string;
//    cardBorderColor?: string;
//    cardStyle: string;
//    cardShadow?: string;
//    backdropBlur: string;
//    fontFamily?: string;
//    borderRadius?: number;
//    layout?: "stack" | "grid" | "masonry";
//    cardPadding?: string;
//    shadow?: string | null;
// }

export const useThemes = () => {
   const themes: ThemeSettings[] = useSelector((state: RootState) => state.theme.theme);
   return useMemo(() => {
      const templates: { id: string; name: string; preview: string }[] = [];
      const templateStyles: Record<string, ThemeSettings> = {};

      for (const t of themes) {
         templates.push({
            id: t.cardStyle, // or t.id if you want the API id
            name: t.name,
            preview: t.preview
         });

         templateStyles[t.name] = {
            name: t.name,
            preview: t.preview,
            id: t.id,
            backgroundColor: t.backgroundColor,
            backgroundType: t.backgroundType,
            primaryColor: t.primaryColor,
            textColor: t.textColor,
            secondaryText: t.secondaryText,
            cardBackground: t.cardBackground,
            cardBorder: t.cardBorder,
            cardBorderColor: t.cardBorderColor || t.cardBorder,
            cardStyle: t.cardStyle,
            cardShadow: t.cardShadow,
            backdropBlur: t.backdropBlur,
            fontFamily: t.fontFamily,
            borderRadius: t.borderRadius,
            layout: t.layout,
            cardPadding: t.cardPadding,
            shadow: t.shadow || undefined
         };
      }

      return { templates, templateStyles };
   }, [themes]);
};
