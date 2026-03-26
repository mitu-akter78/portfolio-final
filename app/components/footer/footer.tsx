"use client"

import React, { useEffect, useRef } from 'react';
import  ShapesPit from '../ballpit';

export default function Footer() {
    return (
        
            <div style={{ width: '100vw', height: '100vh' }}>
  <ShapesPit count={120} />
</div>
       
    );
}