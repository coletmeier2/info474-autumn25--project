(function () {
    window.VizBreakfast = {
        draw: function(p, manager, ai, progress) {
            p.push();
            p.background(255);

            let w = manager.width || 600;
            let h = manager.height || 380;
            let totalKids = 10;
            let kidsEating = 5; 
            let spacing = w / (totalKids + 1);
            let y = h * 0.28;
            let size = 50;
            
            // --- Title / Narrative ---
            p.fill(30);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(20);
            // Draw title in two parts so "Half of" can be bolded while the rest stays normal.
            let part1 = "Half of ";
            let part2 = "Eligible Children Still Miss Out on School Breakfast";
            // Measure widths for accurate centering
            p.push();
            p.textAlign(p.LEFT, p.CENTER);
            p.textStyle(p.BOLD);
            let w1 = p.textWidth(part1);
            p.textStyle(p.NORMAL);
            let w2 = p.textWidth(part2);
            let totalW = w1 + w2;
            let startX = w / 2 - totalW / 2;
            // Draw bold first part
            p.textStyle(p.BOLD);
            p.text(part1, startX, 28);
            // Draw normal remainder
            p.textStyle(p.NORMAL);
            p.text(part2, startX + w1, 28);
            p.pop();
            p.textSize(13);
            p.fill(60);
            let eligible = 50107578;
            p.text("Even though roughly 50 million students qualify for free or reduced-price breakfast, ", w / 2, 50);
            p.text("only 28.5 million actually participate in the program each school day.", w / 2, 65);
            p.textSize(12);
            p.fill(100);
            p.text(`50,107,578 eligible — 28,563,863 participate`, w / 2, 80);

            // --- Child drawing helpers ---
            function drawChild(cx, cy, s, clothColor, mood = 'happy') {
                p.noStroke();
                p.fill(0, 0, 0, 20);
                p.ellipse(cx, cy + s * 0.6, s * 0.9, s * 0.3);

                if (mood === 'sad') {
                    p.fill(clothColor[0] * 0.85, clothColor[1] * 0.85, clothColor[2] * 0.85);
                } else {
                    p.fill(clothColor);
                }
                p.ellipse(cx, cy + s * 0.12, s * 0.7, s * 0.9);

                let headY = cy - s * 0.45;
                p.fill(246, 211, 179);
                p.ellipse(cx, headY, s * 0.5, s * 0.5);

                p.noStroke();
                p.fill(30);

                if (mood === 'sad') {
                    p.ellipse(cx - s * 0.08, headY - s * 0.01, s * 0.05, s * 0.04);
                    p.ellipse(cx + s * 0.08, headY - s * 0.01, s * 0.05, s * 0.04);
                    p.noFill();
                    p.stroke(30);
                    p.strokeWeight(1.2);
                    p.line(cx - s * 0.14, headY - s * 0.12, cx - s * 0.04, headY - s * 0.08);
                    p.line(cx + s * 0.04, headY - s * 0.08, cx + s * 0.14, headY - s * 0.12);
                    p.arc(cx, headY + s * 0.14, s * 0.18, s * 0.10, Math.PI, Math.PI * 2);
                    p.noStroke();
                } else {
                    p.ellipse(cx - s * 0.08, headY - s * 0.03, s * 0.06, s * 0.06);
                    p.ellipse(cx + s * 0.08, headY - s * 0.03, s * 0.06, s * 0.06);
                    p.noFill();
                    p.stroke(30);
                    p.strokeWeight(1.2);
                    p.arc(cx, headY + s * 0.03, s * 0.2, s * 0.12, 0, Math.PI);
                    p.noStroke();
                }

                p.stroke(clothColor[0] * 0.8, clothColor[1] * 0.8, clothColor[2] * 0.8);
                p.strokeWeight(s * 0.09);
                if (mood === 'sad') {
                    p.line(cx - s * 0.18, cy + s * 0.05, cx - s * 0.18, cy + s * 0.45);
                    p.line(cx + s * 0.18, cy + s * 0.05, cx + s * 0.18, cy + s * 0.45);
                } else {
                    p.line(cx - s * 0.36, cy - s * 0.05, cx - s * 0.14, cy + s * 0.05);
                    p.line(cx + s * 0.36, cy - s * 0.05, cx + s * 0.14, cy + s * 0.05);
                }

                p.stroke(60);
                p.strokeWeight(s * 0.1);
                if (mood === 'sad') {
                    p.line(cx - s * 0.08, cy + s * 0.45, cx - s * 0.08, cy + s * 0.85);
                    p.line(cx + s * 0.08, cy + s * 0.45, cx + s * 0.08, cy + s * 0.85);
                } else {
                    p.line(cx - s * 0.14, cy + s * 0.45, cx - s * 0.14, cy + s * 0.85);
                    p.line(cx + s * 0.14, cy + s * 0.45, cx + s * 0.14, cy + s * 0.85);
                }

                p.noStroke();
                p.fill(40);
                p.ellipse(cx - s * 0.14, cy + s * 0.92, s * 0.16, s * 0.08);
                p.ellipse(cx + s * 0.14, cy + s * 0.92, s * 0.16, s * 0.08);
            }

            function drawSeatedChild(cx, cy, s, clothColor, mood = 'happy') {
                p.push();
                p.stroke(60);
                p.strokeWeight(s * 0.1);
                if (mood === 'sad') {
                    p.line(cx - s * 0.08, cy + s * 0.45, cx - s * 0.08, cy + s * 0.85);
                    p.line(cx + s * 0.08, cy + s * 0.45, cx + s * 0.08, cy + s * 0.85);
                } else {
                    p.line(cx - s * 0.14, cy + s * 0.45, cx - s * 0.14, cy + s * 0.85);
                    p.line(cx + s * 0.14, cy + s * 0.45, cx + s * 0.14, cy + s * 0.85);
                }
                p.noStroke();
                p.fill(40);
                p.ellipse(cx - s * 0.14, cy + s * 0.92, s * 0.16, s * 0.08);
                p.ellipse(cx + s * 0.14, cy + s * 0.92, s * 0.16, s * 0.08);

                if (mood === 'sad') {
                    p.fill(clothColor[0] * 0.85, clothColor[1] * 0.85, clothColor[2] * 0.85);
                } else {
                    p.fill(clothColor);
                }
                p.ellipse(cx, cy + s * 0.12, s * 0.7, s * 0.9);

                let headY = cy - s * 0.45;
                p.fill(246, 211, 179);
                p.ellipse(cx, headY, s * 0.5, s * 0.5);

                let deskW = s * 1.6;
                let deskH = s * 0.28;
                let deskY = cy + s * 0.5;

                p.noStroke();
                p.fill(140, 90, 50);
                p.rectMode(p.CENTER);
                p.rect(cx, deskY, deskW, deskH, 6);

                p.stroke(110);
                p.strokeWeight(3);
                let legH = s * 0.5;
                p.line(cx - deskW * 0.35, deskY + deskH / 2, cx - deskW * 0.35, deskY + deskH / 2 + legH);
                p.line(cx + deskW * 0.35, deskY + deskH / 2, cx + deskW * 0.35, deskY + deskH / 2 + legH);

                // If student is sad (missed breakfast), draw an empty plate on the desk
                if (mood === 'sad') {
                    // plate position roughly where the book would be
                    let plateX = cx;
                    let plateY = deskY - deskH * 0.18;
                    p.noStroke();
                    // outer rim (light)
                    p.fill(250);
                    p.ellipse(plateX, plateY, s * 0.44, s * 0.12);
                    // inner surface slightly darker
                    p.fill(235);
                    p.ellipse(plateX, plateY, s * 0.36, s * 0.08);
                    // thin rim line
                    p.stroke(180);
                    p.strokeWeight(1);
                    p.noFill();
                    p.ellipse(plateX, plateY, s * 0.44, s * 0.12);
                    p.noStroke();
                }

                p.stroke(clothColor[0] * 0.9, clothColor[1] * 0.9, clothColor[2] * 0.9);
                p.strokeWeight(s * 0.09);
                if (mood === 'happy') {
                    p.line(cx - s * 0.18, cy + s * 0.05, cx - s * 0.04, deskY - deskH * 0.18);
                    p.line(cx + s * 0.18, cy + s * 0.05, cx + s * 0.04, deskY - deskH * 0.18);

                    p.noStroke();
                    p.fill(255);
                    let bookW = s * 0.5;
                    let bookH = s * 0.14;
                    p.rectMode(p.CENTER);
                    p.rect(cx, deskY - deskH * 0.18, bookW, bookH, 2);
                    p.stroke(200);
                    p.strokeWeight(1);
                    p.line(cx, deskY - deskH * 0.18 - bookH / 2, cx, deskY - deskH * 0.18 + bookH / 2);
                    p.noStroke();
                } else {
                    p.line(cx - s * 0.08, cy + s * 0.2, cx - s * 0.08, cy + s * 0.45);
                    p.line(cx + s * 0.08, cy + s * 0.2, cx + s * 0.08, cy + s * 0.45);
                }

                p.noStroke();
                p.fill(30);
                if (mood === 'sad') {
                    p.ellipse(cx - s * 0.08, headY - s * 0.01, s * 0.05, s * 0.04);
                    p.ellipse(cx + s * 0.08, headY - s * 0.01, s * 0.05, s * 0.04);
                    p.noFill();
                    p.stroke(30);
                    p.strokeWeight(1.2);
                    p.line(cx - s * 0.14, headY - s * 0.12, cx - s * 0.04, headY - s * 0.08);
                    p.line(cx + s * 0.04, headY - s * 0.08, cx + s * 0.14, headY - s * 0.12);
                    p.arc(cx, headY + s * 0.14, s * 0.18, s * 0.10, Math.PI, Math.PI * 2);
                    p.noStroke();
                } else {
                    p.ellipse(cx - s * 0.08, headY - s * 0.03, s * 0.06, s * 0.06);
                    p.ellipse(cx + s * 0.08, headY - s * 0.03, s * 0.06, s * 0.06);
                    p.noFill();
                    p.stroke(30);
                    p.strokeWeight(1.2);
                    p.arc(cx, headY + s * 0.03, s * 0.2, s * 0.12, 0, Math.PI);
                    p.noStroke();
                }

                p.pop();
            }

            for (let i = 0; i < totalKids; i++) {
                let x = spacing * (i + 1);
                let color;
                let mood;

                if (i < kidsEating) {
                    color = [46, 204, 113];
                    mood = 'happy';
                } else {
                    color = [231, 76, 60];
                    mood = 'sad';
                }

                drawSeatedChild(x, y, size, color, mood);
            }

            let legendY = y + size * 0.9;
            p.textSize(13);
            p.fill(0);
            p.textAlign(p.CENTER);
            p.text("Green = gets breakfast    •    Red = misses breakfast", w / 2, legendY + 30);

            // --- Benefits with green checks ---
            let infoBlockW = Math.min(w * 0.85, 560);
            let infoX = (w - infoBlockW) / 2;
            let checkX = infoX + 12;
            let textX = checkX + 28;
            let infoY = legendY + 86;
            let lineSpacing = 64;
            p.textSize(13);
            p.textAlign(p.LEFT, p.TOP);

            const benefits = [
                "Kids who eat breakfast the morning before a standardized test have significantly higher scores in math, spelling and reading than those who don't.",
                "Breakfast eaters have better brain function, memory and attention.",
            ];

            for (let i = 0; i < benefits.length; i++) {
                let iy = infoY + i * lineSpacing;

                p.noStroke();
                p.fill(46, 204, 113);
                p.ellipse(checkX, iy + 6, 16, 16);

                p.stroke(255);
                p.strokeWeight(2);
                p.line(checkX - 4, iy + 6, checkX - 1, iy + 10);
                p.line(checkX - 1, iy + 10, checkX + 6, iy - 2);
                p.noStroke();

                p.fill(30);
                p.text(benefits[i], textX, iy - 6, infoBlockW - (textX - infoX) - 8);
            }

            const warnings = [
                "Missing breakfast is strongly associated with lower academic performance and reduced attention in class.",
                "Students who come to school hungry face higher levels of stress and behavioral challenges."
            ];

            let warningStart = infoY + benefits.length * lineSpacing;

            for (let i = 0; i < warnings.length; i++) {
                let wy = warningStart + i * lineSpacing;

                // red circle
                p.noStroke();
                p.fill(231, 76, 60);
                p.ellipse(checkX, wy + 6, 16, 16);

                // white X
                p.stroke(255);
                p.strokeWeight(2);
                p.line(checkX - 5, wy + 1, checkX + 5, wy + 11);
                p.line(checkX + 5, wy + 1, checkX - 5, wy + 11);
                p.noStroke();

                p.fill(30);
                p.text(warnings[i], textX, wy - 6, infoBlockW - (textX - infoX) - 8);
            }

            p.textSize(10);
            p.textAlign(p.CENTER);
            p.text("Source for additional information: https://pmc.ncbi.nlm.nih.gov/articles/PMC3737458/", w / 2, h);

            p.pop();
        }
    };
})();
