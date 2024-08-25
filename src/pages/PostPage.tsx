import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import {
  IonItem,
  IonImg,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';



const PostPage: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const history = useHistory();
  defineCustomElements(window);

  const takePhoto = async () => {

    const permission = await Camera.requestPermissions({ permissions: ['camera'] });

    if (permission && permission.camera === 'granted') {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        allowEditing: true,
        source: CameraSource.Prompt,
        quality: 90,
      });

      setPhotos((prevPhotos) => [...prevPhotos, photo]);
    } else {
      console.error('Camera permission not granted');
    }
  };

  const choosePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 90,
    });

    setPhotos((prevPhotos) => [...prevPhotos, photo]);
  };

  const handleSubmit = () => {
    // Handle the post submission logic here
    console.log("Photos submitted:", photos);

    history.goBack();
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Post Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={takePhoto}>
                Take Photo
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={choosePhoto}>
                Choose Photo
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webPath} />
              </IonCol>
            ))}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonSelect label="Size" labelPlacement="fixed">
                  <IonSelectOption value="XS">XS</IonSelectOption>
                  <IonSelectOption value="S">S</IonSelectOption>
                  <IonSelectOption value="M">M</IonSelectOption>
                  <IonSelectOption value="L">L</IonSelectOption>
                  <IonSelectOption value="XL">XL</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonSelect label="Condition" labelPlacement="fixed" placeholder="Amount of Times Worn">
                  <IonSelectOption value="0-1 times">0-1 times</IonSelectOption>
                  <IonSelectOption value="1-4">1-4</IonSelectOption>
                  <IonSelectOption value="5+">5+</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput id='brand'>Brand</IonInput>
            </IonCol>
            <IonCol>
              <IonInput id='Description'>Description</IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSubmit}>
                Submit Post
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PostPage;
