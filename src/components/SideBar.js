import React from "react";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu
} from "cdbreact";
import PersonalPhoto from "./reusables/images/Sarang-passport photo.jpg";
import Image from "react-bootstrap/Image";
import { SocialIcon } from "react-social-icons";
export default function Sidebar() {
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            <Image
              src={PersonalPhoto}
              roundedCircle
              style={{ height: "150px", width: "150px" }}
            />
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <CDBSidebarMenuItem style={{ textAlign: "center" }}>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "20px 5px"
                }}
              >
                <SocialIcon url="https://www.instagram.com" />
              </div>
            </CDBSidebarMenuItem>
            <CDBSidebarMenuItem style={{ textAlign: "center" }}>
              <div
                className="sidebar-btn-wrapper"
                style={{
                  padding: "40px 5px"
                }}
              >
                <SocialIcon url="https://www.github.com" />
              </div>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
          <CDBSidebarMenuItem style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
                marginBottom: "40px"
              }}
            >
              <SocialIcon url="https://www.linkedin.com" />
            </div>
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
                marginBottom: "40px"
              }}
            >
              <a href="/">
                <strong>About</strong>
              </a>
            </div>
          </CDBSidebarMenuItem>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
}
