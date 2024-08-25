import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import ImageCard from '../components/ImageCard';
import './Listings.css';
import { useHistory } from 'react-router-dom';

const Listings: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState(1);
  const history = useHistory();

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
            <IonTitle>Listings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonCard className="info-card">
          <IonCardHeader className="info-card-header">
            <IonCardTitle>Insert Name: {items.length} Items</IonCardTitle>
            <IonButton className="post-button" onClick={() => history.push('/post')}>Post More Info</IonButton>
          </IonCardHeader>
        </IonCard>
          <IonList className="listings-grid">
            {items.map((item) => (
              <ImageCard key={item.id} url={item.download_url} id={item.id} className="image-card" />
            ))}
          </IonList>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          <IonInfiniteScroll
            onIonInfinite={(e: CustomEvent<void>) => {
              fetchData();
              (e.target as HTMLIonInfiniteScrollElement).complete();
            }}
          >
            <IonInfiniteScrollContent loadingText="Loading more data..."></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonContent>
      </IonPage>
  );
};

export default Listings;
