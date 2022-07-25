
function donutRender(A, B) {

    let theta_spacing = 0.07;
    let phi_spacing = 0.02;

    let pi = Math.PI

    let R1 = 10;
    let R2 = 20;
    let K2 = 50;
    let K1 = 15;

    let cosA = Math.cos(A),
        sinA = Math.sin(A),
        cosB = Math.cos(B),
        sinB = Math.sin(B)

    let output = [],
        zbuffer = []

    for (let i = 0; i < c_maxY; i++) {
        let row = [],
            rowZ = []

        for (let j = 0; j < c_maxX; j++) {
            row.push(" ")
            rowZ.push(0)
        }
        output.push(row)
        zbuffer.push(rowZ)
    }

    // theta goes around the cross-sectional circle of a torus
    for (let theta = 0; theta < 2 * pi; theta += theta_spacing) {

        //theta
        let costheta = Math.cos(theta),
            sintheta = Math.sin(theta);

        // phi goes around the center of revolution of a torus
        for (let phi = 0; phi < 2 * pi; phi += phi_spacing) {

            //phis
            let cosphi = Math.cos(phi),
                sinphi = Math.sin(phi);

            /*
            let x = (R2 + R1 * costheta) * (cosB * cosphi + sinA * sinB * sinphi) - R1 * cosA * sinB * sintheta,
                y = (R2 + R1 * costheta) * (sinB * cosphi - sinA * cosB * sinphi) + R1 * cosA * cosB * sintheta,
                z = (cosA * (R2 + R1 * costheta) * sinphi + R1 * sinA * sintheta) + K2;
            let ooz = 1 / z*/

            let circlex = R2 + R1*costheta;
            let circley = R1*sintheta;

            //xyz projection
            let x = circlex*(cosB*cosphi + sinA*sinB*sinphi)
              - circley*cosA*sinB; 
            let y = circlex*(sinB*cosphi - sinA*cosB*sinphi)
              + circley*cosA*cosB;
            let z = K2 + cosA*circlex*sinphi + circley*sinA;
            let ooz = 1/z;  

            // x and y projection.  note that y is negated here, because y
            // goes up in 3D space but down on 2D displays.
            let xp = Math.floor(c_maxX / 2 + K1 * ooz * x),
                yp = Math.floor(c_maxY / 2 - K1 * ooz * y);
            //lmao why yp have some negated value, checked paper but have no idea why it happens when projected it to 2d 
            

            // calculate luminance.  ugly, but correct.
            L = cosphi * costheta * sinB - cosA * costheta * sinphi -
                sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi);

            if (L > 0) {
                if(xp < c_maxX && xp >= 0 && yp < c_maxY && yp >= 0)
                if ((1 / z) > zbuffer[yp][xp]) {
                    //z buffer stuffs, checked wiki
                    zbuffer[yp][xp] = 1 / z;
                    let luminance_index = Math.floor(L * 8);
                    output[yp][xp] = ".,-~:;=!*#$@"[luminance_index > 0 ? luminance_index : 0];
                }

            }
        }
    }


    for (let j = 0; j < c_maxY; j++) {
        for (let i = 0; i < c_maxX; i++) {
            k_drawAt(i, j, output[j][i], "Text")
        }
    }

}


