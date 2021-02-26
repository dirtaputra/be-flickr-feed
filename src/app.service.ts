import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { toJson } from 'xml2json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getFeed() {
    // get data from flickr
    const feedData: any = await axios.get(
      'https://www.flickr.com/services/feeds/photos_public.gne',
    );

    // Parse to Json
    const data: any = toJson(feedData.data);
    const feed = JSON.parse(data);

    // Destructure Field Data
    let feedArr = [];
    let image;

    for await (const data of feed.feed.entry) {
      // filter only image type
      image = data.link[1].href;
      const image_type = image.match(/[\w\.\$]+(?=png|jpg)\w+/g);
      if (image_type) {
        const feedObject = {
          title: data.title,
          pict: data.link[1].href,
          published: data.published,
          author: data.author.name,
        };
        feedArr.push(feedObject);
      }
    }
    return feedArr;
  }
}
