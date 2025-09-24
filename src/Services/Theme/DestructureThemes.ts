import { ThemeSettings } from "@/types";

export function destructureThemes(apiResponse: ThemeSettings[]) {
   const templates = apiResponse.map(theme => ({
      name: theme.name,
      preview: theme.preview,
   }));

   const templateStyles: Record<string, ThemeSettings> = {};
   apiResponse.forEach(theme => {
      const key = theme.name.toLowerCase().replace(/\s+/g, "-"); // slugify name
      templateStyles[key] = theme;
   });

   return { templates, templateStyles };
}