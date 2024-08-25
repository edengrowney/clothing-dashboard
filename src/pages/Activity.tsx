
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardTitle,
  IonThumbnail,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
// import ExploreContainer from '../components/ExploreContainer';
import ImageCard from '../components/ImageCard';
import './Activity.css';

const Activity: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://picsum.photos/v2/list?page=${page}`);
      console.log("Fetching data for page:", page);
      const data = await response.json();
      console.log("Fetched data:", data);

      setItems((prevItems) => [...prevItems, ...data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Activity</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {items.map((item) => (
          // <IonItem key={item.id}>{item.download_url}</IonItem>
          // <ImageCard url={item.download_url} id={item.id}></ImageCard>
              <IonItem>
            <IonThumbnail slot="start">
              <img alt={item.id} src={item.download_url} />
            </IonThumbnail>
            <IonLabel>Item</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <IonInfiniteScroll onIonInfinite={(e: CustomEvent<void>) => {
        fetchData();
        (e.target as HTMLIonInfiniteScrollElement).complete();
      }}>
        <IonInfiniteScrollContent loadingText="Loading more data..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>

  </IonPage>
    // <IonCard>
    //   <IonCardHeader>
    //     <IonCardTitle>Card Title</IonCardTitle>
    //     <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
    //   </IonCardHeader>
    //   <IonCardContent>
    //     <IonList>
    //       <IonItem>
    //         <IonThumbnail slot="start">
    //           <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
    //         </IonThumbnail>
    //         <IonLabel>Item</IonLabel>
    //       </IonItem>

    //       <IonItem>
    //         <IonThumbnail slot="start">
    //           <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
    //         </IonThumbnail>
    //         <IonLabel>Item</IonLabel>
    //       </IonItem>

    //       <IonItem>
    //         <IonThumbnail slot="start">
    //           <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
    //         </IonThumbnail>
    //         <IonLabel>Item</IonLabel>
    //       </IonItem>

    //       <IonItem lines="none">
    //         <IonThumbnail slot="start">
    //           <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
    //         </IonThumbnail>
    //         <IonLabel>Item</IonLabel>
    //       </IonItem>
    //     </IonList>
    //   </IonCardContent>
    // </IonCard>
  );
};



export default Activity;
