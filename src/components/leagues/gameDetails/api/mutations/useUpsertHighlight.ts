import { supabase } from "@/supabase/createClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpsertHighlightInput {
    scheduleId: string;
    title?: string;
    url: string;
}

function convertTwitchClipUrl(url: string): string {
        const clipId = url.split('/').pop();
        return `https://clips.twitch.tv/embed?clip=${clipId}&parent=cfbgamehub.netlify.app&parent=www.cfbgamehub.netlify.app`;
}

function convertYoutubeUrl(url: string): string {
    const videoId = url.split('v=').pop();
    return `https://www.youtube.com/embed/${videoId}`;
}

function convertShortYoutubeUrl(url: string): string {
    const urlObj = new URL(url);
    const videoId = urlObj.pathname.split('/').pop();
    const searchParams = urlObj.search;
    return `https://www.youtube.com/embed/${videoId}${searchParams}`;
}

async function upsertHighlight(formData: UpsertHighlightInput) {
    // Twitch embeds require parent parameter to be set to the domain of the site
    if (formData.url.includes("twitch.tv")) {
        formData.url = convertTwitchClipUrl(formData.url);
    } else if (formData.url.includes("youtu.be")) {
        formData.url = convertShortYoutubeUrl(formData.url);
    } else if (formData.url.includes("youtube.com")) {
        formData.url = convertYoutubeUrl(formData.url);
    }

  const { error } = await supabase.from("highlights")
  .upsert({
    schedule_id: formData.scheduleId,
    title: formData.title,
    url: formData.url,
  }, { onConflict: 'id' }).select();

  if (error) {
    throw new Error("Error code: " + error.code + "\nFailed to add/edit highlight");
  }
}

export function useUpsertHighlight() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["upsertHighlight"],
    mutationFn: async (formData: UpsertHighlightInput) => {
      return upsertHighlight(formData);
    },
    onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["getHighlights"] });
    },
   
  });
}
