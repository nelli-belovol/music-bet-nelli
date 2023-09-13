import { useContext, useEffect, useState } from 'react';
import path3 from '../../assets/profile/Path3.png';
import path4 from '../../assets/profile/Path 4.png';
import path5 from '../../assets/profile/Path 5.png';
import path6 from '../../assets/profile/Path 5.png';
import path7 from '../../assets/profile/Path 6.png';

import styled from './MovingBackground.module.scss';
// import { AuthContext } from '../../providers/AuthProvider';

interface IProps {
  children?: any;
  customBackground?: any;
}

const MovingBackground: React.FC<IProps> = ({ children, customBackground }) => {
	
    return (
        <div className={styled.container}>
            <div className={customBackground ? styled.hiddenExplore : styled.hidden}>
                <div>
                    <img src={path3} className={styled.path} alt=""/>
                    <img src={path4} className={styled.path} alt="" />
                    <img src={path5} className={styled.path} alt="" />
                    <img src={path6} className={styled.path} alt="" />
                    <img src={path7} className={styled.path} alt="" />
                </div>
                {!customBackground &&
                    <>
                        <div className={styled.blob}>
                        
                        </div>

                        <div className={styled.blob2}>
                        
                        </div>

                        <div className={styled.blob3}>
                        
                        </div>

                        <div className={styled.blob4}>
                        
                        </div>
                        <div className={styled.blob5}>
                        
                        </div>
                        <div className={styled.blob6}>
                        
                        </div>
                    </>
                }

                {customBackground &&
                    <>
                        <div className={styled.blobb}>
                        
                        </div>

                        <div className={styled.blobb2}>
                        
                        </div>

                        <div className={styled.blobb3}>
                        
                        </div>

                        <div className={styled.blobb4}>
                        
                        </div>
                        <div className={styled.blobb5}>
                        
                        </div>
                        <div className={styled.blobb6}>
                        
                        </div>
                    </>
                }
                
            </div>
            {children}
        </div>
    );
};

export { MovingBackground };
