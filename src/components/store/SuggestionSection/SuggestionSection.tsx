import React from 'react'
import SuggestionBanner from './SuggestionBanner'

const SuggestionSection = () => {
  return (
    <div className="grid grid-cols-3 w-full gap-4">
        <SuggestionBanner imgUrl="/wallpapers/store/epic-arkham-image.png" />
        <SuggestionBanner imgUrl="/wallpapers/store/epic-fortnite-image.png" />
        <SuggestionBanner imgUrl="/wallpapers/store/epic-league-image.png" />
    </div>
  )
}

export default SuggestionSection