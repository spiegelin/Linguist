
//Notifications.jsx
import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from '../components/MainLayout';

const notificationsData = [
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-mark-webber.webp",
    name: "Mark Webber",
    action: "reacted to your recent post",
    post: "My first tournament today!",
    time: "1m ago",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-angela-gray.webp",
    name: "Angela Gray",
    action: "followed you",
    time: "5m ago",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-jacob-thompson.webp",
    name: "Jacob Thompson",
    action: "has joined your group",
    group: "Chess Club",
    time: "1 day ago",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-rizky-hasanuddin.webp",
    name: "Rizky Hasanuddin",
    action: "sent you a private message",
    time: "5 days ago",
    message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-kimberly-smith.webp",
    name: "Kimberly Smith",
    action: "commented on your picture",
    time: "1 week ago",
    commentImage: "https://digitshack.com/codepen/mentor14/image-chess.webp",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-nathan-peterson.webp",
    name: "Nathan Peterson",
    action: "reacted to your recent post",
    post: "5 end-game strategies to increase your win rate",
    time: "2 weeks ago",
    unseen: true,
  },
  {
    avatar: "https://digitshack.com/codepen/mentor14/avatar-anna-kim.webp",
    name: "Anna Kim",
    action: "left the group",
    group: "Chess Club",
    time: "2 weeks ago",
    unseen: true,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unseen: false
    })));
  };

  const unreadCount = notifications.filter(notification => notification.unseen).length;

  return (
    <MainLayout>
      <Container>
        <TopBar>
          <Title>
            <TitleText>Notifications</TitleText>
            <Num>{unreadCount}</Num>
          </Title>
          <ReadLink onClick={markAllAsRead}>Mark all as read</ReadLink>
        </TopBar>
        <NotificationsContainer>
          {notifications.map((notification, index) => (
            <Notification key={index} unseen={notification.unseen}>
              <Avatar>
                <img src={notification.avatar} alt="Avatar" />
              </Avatar>
              <BoxText>
                <Notifi>
                  <Name>{notification.name} </Name>
                  {notification.action}{" "}
                  {notification.post && <Post>{notification.post}</Post>}
                  {notification.group && <Group>{notification.group}</Group>}
                  {notification.unseen && <Dot />}
                </Notifi>
                <Time>{notification.time}</Time>
                {notification.message && <Message>{notification.message}</Message>}
                {notification.commentImage && (
                  <ImgBox>
                    <img src={notification.commentImage} alt="Comment" />
                  </ImgBox>
                )}
              </BoxText>
            </Notification>
          ))}
        </NotificationsContainer>
      </Container>
    </MainLayout>
  );
}

const Container = styled.div`
  height: 100vh;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const TitleText = styled.p`
  color: hsl(224, 21%, 14%);
  font-size: 28px;
  font-weight: 800;
`;

const Num = styled.p`
  color: #fff;
  background-color: hsl(219, 85%, 26%);
  padding: 3px 12px;
  border-radius: 5px;
  font-weight: 800;
  margin-left: 5px;
`;

const ReadLink = styled.a`
  text-decoration: none;
  color: hsl(219, 14%, 63%);
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: hsl(219, 85%, 26%);
  }
`;

const NotificationsContainer = styled.div`
  background-color: #fff;
  padding: 40px 30px 0;
  margin: 30px;
  border-radius: 15px;
  box-shadow: 0px 0px 26px -13px rgba(0, 0, 0, 0.26);
`;

const Notification = styled.div`
  padding: 17px;
  margin: 12px 0;
  display: flex;
  align-items: center;
  background-color: ${props => (props.unseen ? 'hsl(210, 60%, 98%)' : 'transparent')};
  border-radius: 10px;
`;

const Avatar = styled.div`
  img {
    width: 50px;
    margin-right: 15px;
  }
`;

const BoxText = styled.div``;

const Notifi = styled.p`
  a {
    text-decoration: none;
  }
  a.name,
  a.post,
  a.group {
    font-weight: 800;
  }
  a.name {
    color: hsl(224, 21%, 14%);
  }
  a.post,
  a.group {
    color: hsl(219, 12%, 42%);
  }
  a.name:hover,
  a.post:hover,
  a.group:hover {
    color: hsl(219, 85%, 26%);
  }
`;

const Name = styled.a`
  color: hsl(224, 21%, 14%);
  font-weight: 800;
`;

const Post = styled.a`
  color: hsl(219, 12%, 42%);
  font-weight: 800;
`;

const Group = styled.a`
  font-weight: 800;
`;

const Dot = styled.span`
  display: inline-block;
  background-color: hsl(1, 90%, 64%);
  height: 9px;
  width: 9px;
  border-radius: 50%;
  margin-left: 7px;
`;

const Time = styled.p`
  font-size: 0.8em;
  color: hsl(219, 12%, 42%);
`;

const Message = styled.div`
  border: 2px solid hsl(205, 33%, 90%);
  padding: 12px;
  font-size: 18px;
  margin-top: 13px;
  border-radius: 5px;
`;

const ImgBox = styled.div`
  img {
    width: 50px;
  }
`;

export default Notifications;

