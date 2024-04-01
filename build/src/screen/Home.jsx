import React from 'react';
import CustomSlick from '../components/sliders/Slider';
import GoodsOfAllKind from '../components/home/GoodsOfAllKind';
import Fashion from '../components/home/Fashion';
import Lesson from '../components/home/Lesson';
import Jobs from '../components/home/Jobs';
import TopCity from '../components/home/TopCity';
import { useAppContext } from '../contextApi/AppContext';
import FreeLancer from '../components/home/FreeLancer';
import RealEstate from '../components/home/RealEstate';
import ElectronicsBanner from '../components/home/ElectronicsBanner';  
 
const Home = () => {
  const { serviceList } = useAppContext();
  
  return (
    <>
      <CustomSlick />
      <div className='bgtheme'>
        {Array.isArray(serviceList) && serviceList.map((item, index) => {
          switch (item.slug) {
            case '"goods_of_all_kinds"':
              return <GoodsOfAllKind key={index} item={item} index={index} />;
            case 'fashion_beauty':
              return <Fashion key={index} item={item} index={index} />;
            case 'lesson_courses':
              return <Lesson key={index} item={item} index={index} />;
            case 'jobs':
              return <Jobs key={index} item={item} index={index} />;
            case 'freelancer':
              return <FreeLancer key={index} item={item} index={index} />;
            case 'real_estate':
              return <RealEstate key={index} item={item} index={index} />;
            case 'electronics':
              return <ElectronicsBanner key={index} item={item} index={index} />;
            default:
              return null;
          }
        })}
        <TopCity />
      </div>
    </>
  );
};

export default Home;
