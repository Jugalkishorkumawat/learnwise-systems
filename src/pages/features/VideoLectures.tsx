
import FeatureTemplate from '@/components/features/FeatureTemplate';
import { PlayCircle } from 'lucide-react';

const VideoLectures = () => {
  return (
    <FeatureTemplate
      title="Video Lectures"
      description="Educational video content library"
      icon={PlayCircle}
      features={[
        "Lecture recordings",
        "Video library",
        "Playback controls",
        "Note-taking",
        "Bookmark features",
        "Progress tracking"
      ]}
    />
  );
};

export default VideoLectures;
