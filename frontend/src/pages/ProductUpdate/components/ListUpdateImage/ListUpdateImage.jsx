import { Grid } from '@mui/material';
import React from 'react';
import { UpdateImage } from '..';
import './ListUpdateImage.scss';

// eslint-disable-next-line object-curly-newline
const ListUpdateImage = ({
  listSlider, // slider server
  thumbnailsSlider,
  onChangeThumbnails,
  onRemoveSlide,
}) => {
  return (
    <div className="list-update-image">
      <h2 className="list-update-image__title">Ảnh slide</h2>
      <Grid container spacing={4}>
        {listSlider?.length <= 4 && (
          <>
            {Array.from(Array(4).keys()).map((item) => (
              <Grid item xs={6} key={item}>
                <h2 className="list-update-image__title">Ảnh {item + 1}</h2>
                {listSlider[item]?.position === item + 1
                && listSlider[item].thumbnailSlide ? (
                  // eslint-disable-next-line max-len
                  <UpdateImage
                    slider={listSlider[item]}
                    position={item + 1}
                    thumbnailPre={thumbnailsSlider[item].prevSlide}
                    onChangeThumbnails={onChangeThumbnails}
                    onRemoveSlide={onRemoveSlide}
                  />
                // eslint-disable-next-line indent
                ) : (
                  // eslint-disable-next-line max-len
                  <UpdateImage
                    slider={{}}
                    position={item + 1}
                    onChangeThumbnails={onChangeThumbnails}
                    thumbnailPre={thumbnailsSlider[item].prevSlide}
                    onRemoveSlide={onRemoveSlide}
                  />
                  )}
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

export default ListUpdateImage;
