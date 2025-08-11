import { View } from '@tarojs/components';
import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TopView,
  Header,
  ScrollView,
  RequestHooks,
  Avatar,
  px
} from '@/duxui';
import Loading from '../components/Loading';
import { useRequest } from '../request';
import Taro from '@tarojs/taro';
import './StochasticMusic.scss';

export interface Data {
  audio: Audio;
  song: Song;
  user: User;
  [property: string]: any;
}

export interface Audio {
  duration: number;
  like_count: number;
  link: string;
  publish: string;
  publish_at: number;
  url: string;
  [property: string]: any;
}

export interface Song {
  lyrics: string[];
  name: string;
  singer: string;
  [property: string]: any;
}

export interface User {
  avatar_url: string;
  gender: string;
  nickname: string;
  [property: string]: any;
}

const StochasticMusic = () => {
  const [data, action]: [Data, RequestHooks.RequestResult] = useRequest({
    url: 'changya'
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const innerAudioContext = useRef<Taro.InnerAudioContext>(null);

  const togglePlay = () => {
    if (!isPlaying) {
      innerAudioContext.current.src = data.audio.url;
      innerAudioContext.current.play();
    } else {
      innerAudioContext.current.pause();
    }
  };

  useEffect(() => {
    innerAudioContext.current = Taro.createInnerAudioContext();
    innerAudioContext.current.onError((res) => {
      Taro.showToast({
        title: '播放失败，请稍后再试',
        icon: 'none'
      });
    });

    innerAudioContext.current.onPlay(() => {
      setIsPlaying(true);
    });

    innerAudioContext.current.onPause(() => {
      setIsPlaying(false);
    });
    return () => {
      innerAudioContext.current.destroy();
    };
  }, []);

  return (
    <TopView>
      <Header title='随机唱歌音频' titleCenter />
      <ScrollView
        onRefresh={() => {
          action.reload();
          innerAudioContext.current.stop();
        }}
      >
        <View className='m-3'>
          {action.loading ? (
            <Loading />
          ) : (
            <>
              {/* 歌曲信息区域 */}
              <View
                className='song-info r-2 p-3 text-center'
                style={{ marginBottom: px(24) }}
              >
                <Text
                  className='text-center'
                  style={{ marginBottom: px(16) }}
                  bold
                  color={'#fff'}
                  size={32}
                >
                  {data.song.name}
                </Text>

                <Text color={'#fff'} size={24}>
                  {data.song.singer}
                </Text>
              </View>
              {/* 翻唱人信息区域 */}
              <View
                className='items-center p-3 bg-white r-2'
                style={{ marginBottom: px(24) }}
              >
                <Avatar src={data.user.avatar_url} size='l' />
                <View className='singer-info'>
                  <View className='flex-row items-center'>
                    <Text style={{ marginRight: px(16) }} size={32} bold>
                      {data.user.nickname}
                    </Text>
                    {data.user.gender === 'male' ? (
                      <Text size={24} color={'#3b82f6'}>
                        ♂
                      </Text>
                    ) : data.user.gender === 'female' ? (
                      <Text size={24} color={'#ec4899'}>
                        ♀
                      </Text>
                    ) : null}
                  </View>
                </View>
              </View>
              {/* 歌词区域 */}
              <View
                className=' p-3 bg-white r-2'
                style={{ marginBottom: px(24) }}
              >
                <View
                  className='flex-row justify-center items-center'
                  style={{ marginBottom: px(24) }}
                >
                  <Text
                    className='text-center '
                    style={{ marginRight: px(16) }}
                    size={32}
                    bold
                    color={'#333'}
                  >
                    歌词
                  </Text>
                  <Text className='text-white' size={32} onClick={togglePlay}>
                    {isPlaying ? '⏸' : '▶'}
                  </Text>
                </View>
                <View className='p-3 r-1'>
                  {data.song.lyrics &&
                    data.song.lyrics.map((line, index) => (
                      <Text
                        key={index}
                        className='lyrics-line'
                        size={24}
                        color={'#555'}
                      >
                        {line}
                      </Text>
                    ))}
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </TopView>
  );
};

export default StochasticMusic;
