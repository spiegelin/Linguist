import React from "react";
import styled from "styled-components";
import MainLayout from '../components/MainLayout';

export function ConfigProfile() {
  return (
  <MainLayout>
    <div className="div">
      <div className="div">
        <h1>Settings</h1>
        <ul>
          <li><button>Edit Profile</button></li>
          <li><button>Security</button></li>
        </ul>
      </div>
      <div className="div">
        <h1>Edit Profile</h1>
        <form>
          <label htmlFor="firstname">First name</label>
          <input type="text" id="firstname" name="firstname" />
          <label htmlFor="lastname">Last name</label>
          <input type="text" id="lastname" name="lastname" />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="country">Country</label>
          <input type="text" id="country" name="country" />
          <label htmlFor="contactnumber">Contact number</label>
          <input type="text" id="contactnumber" name="contactnumber" />
          <label htmlFor="languages">Languages</label>
          <input type="text" id="languages" name="languages" />
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
        </form>
      </div>
    </div>
    </MainLayout>
  );
}
