'use client';

import React, {useState, useEffect} from "react";
import * as S from "../styles/FirstAid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Nav from "../components/Nav";

import VisitModal from "../components/VisitModal";
import RentModal from "../components/RentModal";
import VisitData from "../components/VisitData";
import RentData from "../components/RentData";
import VisitDataAdmin from "../components/VisitDataAdmin";
import RentDataAdmin from "../components/RentDataAdmin";

import { VisitDatas } from "../components/VisitData";
import { VisitAdminDatas } from "../components/VisitDataAdmin";
import { RentDatas } from "../components/RentData";
import { RentAdminDatas } from "../components/RentDataAdmin";

function MainAdmin() {
    return(
        <></>
    )
}

export default MainAdmin