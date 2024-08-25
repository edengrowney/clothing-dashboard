import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/react';

interface ImageCardProps {
  url: string;
  id: string;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ url, id, className }) => {
  return (
    <IonCard className={className}>
      <img alt={id} src={url} />
      <IonCardHeader>
        <IonCardTitle>Card Title</IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        Here's a small text description for the card content. Nothing more, nothing less.
      </IonCardContent>
    </IonCard>
  );
};

export default ImageCard;