import React, { useState, useEffect, useMemo } from 'react';
import {
  Terminal,
  FileText,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  BookOpen,
  Award,
  Layers,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Code,
  Zap,
  HelpCircle,
  FileCode,
  Info,
  CheckCircle2,
  Type,
  WrapText
} from 'lucide-react';

const INITIAL_QUESTIONS = [
  {
    id: "2026-cs-paper-22-febmar-voting",
    year: 2026,
    paper: "Paper 22 (Feb/Mar)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "Class Voting Survey & Index Tracking Sort",
    estimatedTime: "25 mins",
    question: "A program is required to enable voting in class surveys, for example to find the most popular smartphone.\n\n- The 1D array Options[] stores between 2 and 12 options on which users can vote.\n- The 1D array Votes[] stores the votes of between 2 and 1000 users.\n- The 1D array VoteCount[] stores the number of votes for each option. The array index represents the option number.\n\nRequirements:\n1. Initialise all arrays before they are used.\n2. Input and validate the number of options (2 to 12) and the number of voters (2 to 1000).\n3. Input each option and store them in Options[].\n4. Display the list of options for each voter and allow each voter to input their preferred option (with validation).\n5. Count the votes for each option, determine the most and least popular options using sorting or search logic.\n6. Output the most and least popular options along with their vote totals.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/22 Feb/Mar 2026) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\n// Initialisation by clearing all the arrays\nFOR a <-- 1 TO 12\n    Options[a] <-- ""\n    VoteCount[a] <-- 0\nNEXT a\n\nFOR b <-- 1 TO 1000\n    Votes[b] <-- ""\nNEXT b\n\n// Input and validate number of voters\nOUTPUT "Please enter the number of voters (2 - 1000):"\nINPUT numvoters\nWHILE numvoters < 2 OR numvoters > 1000\n    OUTPUT "Invalid input. Please enter a value between 2 and 1000:"\n    INPUT numvoters\nENDWHILE\n\n// Input and validate number of options\nOUTPUT "Please enter the number of options (2 - 12):"\nINPUT numoptions\nWHILE numoptions < 2 OR numoptions > 12\n    OUTPUT "Invalid input. Please enter a value between 2 and 12:"\n    INPUT numoptions\nENDWHILE\n\n// Input each option and store in Options[]\nFOR optioncount <-- 1 TO numoptions\n    OUTPUT "Please enter the description for option #", optioncount, ":"\n    INPUT Options[optioncount]\nNEXT optioncount\n\n// Display options to each voter, take and validate their vote\nFOR voting <-- 1 TO numvoters\n    OUTPUT "=========================================="\n    OUTPUT "VOTER #", voting, " - Choose an option from the list:"\n    FOR optionsdisplay <-- 1 TO numoptions\n        OUTPUT optionsdisplay, ". ", Options[optionsdisplay]\n    NEXT optionsdisplay\n    \n    INPUT vote\n    WHILE vote < 1 OR vote > numoptions\n        OUTPUT "Invalid choice. Please select a valid option number:"\n        INPUT vote\n    ENDWHILE\n    \n    // Store vote and increment vote counter for chosen option\n    Votes[voting] <-- vote\n    VoteCount[vote] <-- VoteCount[vote] + 1\nNEXT voting\n\n// Initialise VoteIndex to track original option positions during sort\nFOR z <-- 1 TO numoptions\n    VoteIndex[z] <-- z\nNEXT z\n\n// Bubble sort VoteCount in ascending order, keeping VoteIndex synchronized\nFOR x <-- 1 TO numoptions - 1\n    FOR y <-- 1 TO numoptions - 1\n        IF VoteCount[y] > VoteCount[y+1] THEN\n            temp1 <-- VoteCount[y]\n            temp2 <-- VoteIndex[y]\n            VoteCount[y] <-- VoteCount[y+1]\n            VoteIndex[y] <-- VoteIndex[y+1]\n            VoteCount[y+1] <-- temp1\n            VoteIndex[y+1] <-- temp2\n        ENDIF\n    NEXT y\nNEXT x\n\n// Least popular is at index 1, most popular is at index numoptions\nleasti <-- VoteIndex[1]\nmosti <-- VoteIndex[numoptions]\n\n// Output the voting results\nOUTPUT "=========================================="\nOUTPUT "MOST POPULAR OPTION: Option #", mosti, " (", Options[mosti], ") with ", VoteCount[numoptions], " votes."\nOUTPUT "LEAST POPULAR OPTION: Option #", leasti, " (", Options[leasti], ") with ", VoteCount[1], " votes."\nOUTPUT "=========================================="`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Correct array initialization for Options, Votes, and VoteCount.\n\nAO2 (Application): 6 Marks\n- Range validation for voters (2-1000) and options (2-12).\n- Displaying options dynamically and accumulating VoteCount per candidate.\n\nAO3 (Evaluation): 6 Marks\n- Synchronized sorting mechanism maintaining index relationship (VoteIndex).\n- Correct identification and formatted output of most and least popular options.",
    evalPoints: [
      "Parallel index mapping (VoteIndex) preserves original option associations during sorting.",
      "Nested WHILE loops guarantee robust boundary validation.",
      "Clear separation of survey configuration, vote collection, and tally analysis."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-23-octnov-game",
    year: 2025,
    paper: "Paper 23 (Oct/Nov)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "Two-Player Game Logic & Tie-Breaker Loops",
    estimatedTime: "25 mins",
    question: "A number game has two players. Random whole numbers are generated for each player and compared.\n\n- 100 random whole numbers between 1 and 6 inclusive are generated for player 1.\n- 100 random whole numbers between 1 and 6 inclusive are generated for player 2.\n- If one number is higher -> that player gets 2 points.\n- If both numbers are equal -> both players get 1 point.\n- After 100 comparisons, the player with the higher total wins.\n- If totals are equal, new random numbers are generated and compared until one player wins. The winner gains 2 additional points.\n\nRequirements:\n1. Input and validate the names of the two players\n2. Generate and store 100 random numbers (1-6 inclusive) for each player\n3. Calculate and store total points\n4. Output name and total points in order of highest score",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/23 Oct/Nov 2025) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\nP1 <-- 0 \nP2 <-- 0 \nDECLARE NumberGenerated : ARRAY[1:100, 1:2] OF INTEGER\n\n// Enter the names of the players\nOUTPUT "Enter name of first player:"\nINPUT Name1\n\nOUTPUT "Enter name of second player:"\nINPUT Name2\n\n// Random Number Generator & Comparison Loop\nFOR I <-- 1 TO 100\n    NumberGenerated[I,1] <-- ROUND(RANDOM()*5 + 1, 0) \n    NumberGenerated[I,2] <-- ROUND(RANDOM()*5 + 1, 0) \n\n    IF NumberGenerated[I,1] = NumberGenerated[I,2] THEN\n        P1 <-- P1 + 1\n        P2 <-- P2 + 1\n    ELSE \n        IF NumberGenerated[I,1] > NumberGenerated[I,2] THEN\n            P1 <-- P1 + 2\n        ELSE\n            P2 <-- P2 + 2\n        ENDIF\n    ENDIF\nNEXT I\n\n// Regenerating new numbers if both players have same number of points\nWHILE P1 = P2 THEN\n    N1 <-- ROUND(RANDOM()*5 + 1, 0)\n    N2 <-- ROUND(RANDOM()*5 + 1, 0)\n\n    IF N1 > N2 THEN\n        P1 <-- P1 + 2\n    ELSE\n        IF N2 > N1 THEN\n            P2 <-- P2 + 2\n        ENDIF\n    ENDIF\nENDWHILE\n\n// Output results in order of highest score\nIF P1 > P2 THEN\n    OUTPUT "1st Place: ", Name1, " with ", P1, " points."\n    OUTPUT "2nd Place: ", Name2, " with ", P2, " points."\nELSE \n    OUTPUT "1st Place: ", Name2, " with ", P2, " points."\n    OUTPUT "2nd Place: ", Name1, " with ", P1, " points."\nENDIF`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Correct variable initialization and array dimensioning.\n\nAO2 (Application): 6 Marks\n- Correct random range formula [1..6] generation.\n- Comparison scoring logic (2 points for win, 1 point each for tie).\n\nAO3 (Evaluation): 6 Marks\n- WHILE loop implementation for ongoing sudden-death tie-breaker.\n- Output structured cleanly in descending order of points.",
    evalPoints: [
      "WHILE loop prevents deadlock in case of equal scores.",
      "Two-dimensional array stores complete round history for auditing.",
      "Proper scaling formula for 1 to 6 uniform discrete random selection."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-23-fairness",
    year: 2025,
    paper: "Paper 23",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "RNG Fairness Test, Frequency Count & Probability",
    estimatedTime: "25 mins",
    question: "A program is required to test the fairness of a random number generator.\n\n- The 1D array RandomNumber[] stores 100,000 random integers (1 to 10 inclusive).\n- The 2D array CountedNumber[] stores integers 1 to 10 and their frequency.\n\nRequirements:\n1. Generate 100,000 random integers between 1 and 10 inclusive and store in RandomNumber[].\n2. Calculate frequency of each integer 1 to 10 and store in CountedNumber[].\n3. Sort CountedNumber[] in descending order of frequency.\n4. Calculate probability of generating each integer rounded to 4 decimal places (chance = frequency / 100000).\n5. Output sorted results with numbers and calculated probabilities.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/23 Paper 2) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\nDECLARE RandomNumber : ARRAY[1:100000] OF INTEGER\nDECLARE CountedNumbers : ARRAY[1:10, 1:2] OF INTEGER\nDECLARE Chance : ARRAY[1:10] OF REAL\nDECLARE a, b, c, x, y, z, T1, T2 : INTEGER\n\n// Initialize the CountedNumbers[] array\nFOR b <-- 1 TO 10\n    CountedNumbers[b,1] <-- b\n    CountedNumbers[b,2] <-- 0\nNEXT b \n\n// Generate random numbers and count frequency\nFOR a <-- 1 TO 100000\n    RandomNumber[a] <-- ROUND(RANDOM()*9 + 1, 0)\n    \n    // Increment matching frequency bin directly\n    CountedNumbers[RandomNumber[a], 2] <-- CountedNumbers[RandomNumber[a], 2] + 1\nNEXT a\n\n// Sorting CountedNumbers array into descending order of frequency using Bubble Sort\nFOR x <-- 1 TO 9\n    FOR y <-- 1 TO 9\n        IF CountedNumbers[y,2] < CountedNumbers[y+1,2] THEN\n            T1 <-- CountedNumbers[y,1]\n            T2 <-- CountedNumbers[y,2]\n\n            CountedNumbers[y,1] <-- CountedNumbers[y+1,1]\n            CountedNumbers[y,2] <-- CountedNumbers[y+1,2]\n\n            CountedNumbers[y+1,1] <-- T1\n            CountedNumbers[y+1,2] <-- T2\n        ENDIF\n    NEXT y\nNEXT x\n\n// Calculate probability and output sorted results\nFOR z <-- 1 TO 10\n    Chance[z] <-- ROUND(CountedNumbers[z,2] / 100000.0, 4)\n    OUTPUT "Rank ", z, ": Number ", CountedNumbers[z,1], " | Frequency: ", CountedNumbers[z,2], " | Probability: ", Chance[z]\nNEXT z`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Declaration of 1D and 2D arrays with correct sizes and types.\n\nAO2 (Application): 6 Marks\n- Generation of 100,000 random integers and frequency tallying.\n- Implementation of descending 2D array swap logic.\n\nAO3 (Evaluation): 6 Marks\n- Division and rounding to 4 decimal places for probability calculation.\n- Formatted output of ranked numbers with probabilities.",
    evalPoints: [
      "Direct indexing for frequency updates avoids O(N*M) nested loops, running in O(N) time.",
      "Synchronized 2D array swapping keeps number IDs linked to their frequencies.",
      "Round function guarantees 4 decimal place statistical precision."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-21-mayjune-tournament",
    year: 2025,
    paper: "Paper 21 (May/June)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "2D Array Scoring, Validation & Award Identification",
    estimatedTime: "25 mins",
    question: "Array CompetitorName[25] contains names of 25 competitors in a tournament with 5 events. Array CompetitorScore[25, 5] contains points (0 to 100) per event.\n\nRequirements:\n1. Input and validate scores (0 to 100) for each competitor in each of the 5 events.\n2. Calculate highest points scored for each event and total points per competitor in Points[25].\n3. Output names of competitors who win medals for highest points in each event.\n4. Calculate highest overall total score across all events and output overall medal winner(s).",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/21 May/June 2025) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\n// Loop through competitors and events to input scores\nFOR b <-- 1 TO 25\n    Points[b] <-- 0\n    FOR a <-- 1 TO 5\n        REPEAT\n            OUTPUT "Input score for competitor ", CompetitorName[b], " in Event ", a, " (0-100):"\n            INPUT CompetitorScore[b,a]\n            IF CompetitorScore[b,a] < 0 OR CompetitorScore[b,a] > 100 THEN\n                OUTPUT "Error: Score must be between 0 and 100."\n            ENDIF\n        UNTIL CompetitorScore[b,a] >= 0 AND CompetitorScore[b,a] <= 100\n        \n        // Accumulate total points for competitor\n        Points[b] <-- Points[b] + CompetitorScore[b,a]\n    NEXT a\nNEXT b\n\n// Find highest score in each event\nFOR a <-- 1 TO 5\n    Highest[a] <-- CompetitorScore[1,a]\n    FOR b <-- 2 TO 25\n        IF CompetitorScore[b,a] > Highest[a] THEN\n            Highest[a] <-- CompetitorScore[b,a]\n        ENDIF\n    NEXT b\nNEXT a\n\n// Find highest total points overall\nHighestT <-- Points[1]\nFOR c <-- 2 TO 25\n    IF Points[c] > HighestT THEN\n        HighestT <-- Points[c]\n    ENDIF\nNEXT c\n\n// Output event medal winners (handles ties)\nOUTPUT "==============================================="\nOUTPUT "          EVENT MEDAL WINNERS                 "\nOUTPUT "==============================================="\nFOR d <-- 1 TO 5\n    FOR e <-- 1 TO 25\n        IF CompetitorScore[e,d] = Highest[d] THEN\n            OUTPUT "Event ", d, " Medal Winner: ", CompetitorName[e], " (Score: ", Highest[d], ")"\n        ENDIF\n    NEXT e\nNEXT d\n\n// Output overall tournament champion\nOUTPUT "-----------------------------------------------"\nOUTPUT "          OVERALL TOURNAMENT CHAMPION          "\nOUTPUT "-----------------------------------------------"\nFOR f <-- 1 TO 25\n    IF Points[f] = HighestT THEN\n        OUTPUT "Gold Medal Overall: ", CompetitorName[f], " with Total Score: ", HighestT\n    ENDIF\nNEXT f`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Proper indexing of 2D array CompetitorScore[competitor, event].\n\nAO2 (Application): 6 Marks\n- REPEAT...UNTIL input validation loop enforcing 0 <= score <= 100.\n- Score accumulation per competitor across 5 events.\n\nAO3 (Evaluation): 6 Marks\n- Secondary scanning loops to award medals to all tied top performers.\n- Correct logic for identifying maximums per event and overall total.",
    evalPoints: [
      "Validation loop prevents illegal negative or >100 scores from entering data set.",
      "Equality checking in final output loops seamlessly handles shared medal positions.",
      "Decoupled calculation and output passes enhance code modularity."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-23-mayjune-videolib",
    year: 2025,
    paper: "Paper 23 (May/June)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "Menu-Driven Search System & 2D Catalog Management",
    estimatedTime: "25 mins",
    question: "A collector needs a video library system for 10,000 records stored in 2D array Video[10000, 4] (Title, Format, Year, StorageCode).\n\nRequirements:\n1. Initialise Video[] to empty strings. Array Results[20, 4] holds up to 20 search matches.\n2. Interactive menu: 1 = Add Video, 2 = Search by Title, 3 = Stop.\n3. Add Video: stores data in first available array slot with option to add more.\n4. Search: clears Results[], searches Video[] linearly for title match, copies matching records to Results[].\n5. Output search results or display 'not found' message if zero matches.\n6. Repeat menu until user selects Stop.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/23 May/June 2025) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\n// Initializing the Video[] array to empty strings\nFOR a <-- 1 TO 10000\n    FOR b <-- 1 TO 4\n        Video[a,b] <-- ""\n    NEXT b\nNEXT a\n\nPos <-- 1\nStop <-- FALSE\n\nREPEAT\n    OUTPUT "=========================================="\n    OUTPUT "           VIDEO LIBRARY SYSTEM           "\n    OUTPUT "=========================================="\n    OUTPUT "1. Add New Video"\n    OUTPUT "2. Search Video by Title"\n    OUTPUT "3. Exit System"\n    OUTPUT "Enter Choice (1-3):"\n    INPUT Choice\n\n    CASE OF Choice\n        1: REPEAT\n               IF Pos <= 10000 THEN\n                   OUTPUT "Enter Video Title:"\n                   INPUT Video[Pos, 1]\n\n                   OUTPUT "Enter Format (4K Blu-ray, Blu-ray, DVD, Digital):"\n                   INPUT Video[Pos, 2]\n\n                   OUTPUT "Enter Release Year:"\n                   INPUT Video[Pos, 3]\n\n                   OUTPUT "Enter Storage Code:"\n                   INPUT Video[Pos, 4]\n\n                   Pos <-- Pos + 1\n               ELSE\n                   OUTPUT "Library full! Cannot add more videos."\n               ENDIF\n\n               OUTPUT "Do you want to add another video? (Y/N):"\n               INPUT Rep\n           UNTIL Rep <> "Y" AND Rep <> "y"\n\n        2: // Clearing Results[] array\n           FOR c <-- 1 TO 20\n               FOR d <-- 1 TO 4\n                   Results[c,d] <-- ""\n               NEXT d\n           NEXT c\n\n           OUTPUT "Enter Video Title to Search:"\n           INPUT SearchName\n\n           PosR <-- 1\n           E <-- 1\n\n           WHILE PosR <= 20 AND E < Pos\n               IF Video[E,1] = SearchName THEN\n                   Results[PosR, 1] <-- Video[E,1]\n                   Results[PosR, 2] <-- Video[E,2]\n                   Results[PosR, 3] <-- Video[E,3]\n                   Results[PosR, 4] <-- Video[E,4]\n                   PosR <-- PosR + 1\n               ENDIF\n               E <-- E + 1\n           ENDWHILE\n\n           IF PosR = 1 THEN\n               OUTPUT "No matching video titles found."\n           ELSE\n               OUTPUT "------------------------------------------"\n               OUTPUT "MATCHES FOUND (" , PosR - 1, "):"\n               FOR k <-- 1 TO PosR - 1\n                   OUTPUT "Title: ", Results[k,1], " | Format: ", Results[k,2], " | Year: ", Results[k,3], " | Code: ", Results[k,4]\n               NEXT k\n           ENDIF\n\n        3: Stop <-- TRUE\n\n        OTHERWISE OUTPUT "Invalid choice. Please choose 1, 2, or 3."\n    ENDCASE\nUNTIL Stop = TRUE`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Proper initialization of multi-dimensional structure array elements.\n\nAO2 (Application): 6 Marks\n- CASE...OF structure for main operational control flow.\n- Linear search loop extracting records into search result matrix.\n\nAO3 (Evaluation): 6 Marks\n- Position pointer tracking for next free slot (Pos).\n- Result bound checking (PosR <= 20) preventing buffer overflows.",
    evalPoints: [
      "Pos pointer tracks active database bounds, saving execution time during search.",
      "Results buffer isolation keeps search query displays structured.",
      "CASE menu handles menu loop state cleanly."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-21-octnov-archery",
    year: 2025,
    paper: "Paper 21 (Oct/Nov)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "Nested Loops, Score Trimming & Archery Qualification",
    estimatedTime: "25 mins",
    question: "An archery competition records scores for up to 30 competitors across 10 rounds in CompetitorScore[30, 10].\n\nRequirements:\n1. Input scores (0-30 validation) for each competitor across 10 rounds.\n2. Discard highest and lowest scores for each competitor.\n3. Calculate overall score as sum of remaining 8 middle scores.\n4. Qualification logic: Total >= 210 -> Qualified (Q), 180-209 -> Reserve (R), < 180 -> Not Qualified (N).\n5. Output competitor names and classifications.\n6. Output total counts of Qualified, Reserve, and Not Qualified competitors.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/21 Oct/Nov 2025) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\nQualified <-- 0\nReserve <-- 0\nFail <-- 0\n\n// Loop through all 30 competitors\nFOR i <-- 1 TO 30\n    FOR j <-- 1 TO 10\n        OUTPUT "Enter score for ", CompetitorName[i], " in Round ", j, " (0-30):"\n        INPUT CompetitorScore[i,j]\n\n        // Validation loop\n        WHILE CompetitorScore[i,j] < 0 OR CompetitorScore[i,j] > 30\n            OUTPUT "Invalid score! Please enter a value between 0 and 30 inclusive:"\n            INPUT CompetitorScore[i,j]\n        ENDWHILE\n    NEXT j\n\n    // Bubble sort rounds for competitor 'i' in ascending order\n    FOR a <-- 1 TO 9\n        FOR b <-- 1 TO 9\n            IF CompetitorScore[i,b] > CompetitorScore[i,b+1] THEN\n                T1 <-- CompetitorScore[i,b]\n                CompetitorScore[i,b] <-- CompetitorScore[i,b+1]\n                CompetitorScore[i,b+1] <-- T1\n            ENDIF\n        NEXT b\n    NEXT a\n\n    // Calculate sum of middle 8 scores (index 2 through 9)\n    Total <-- 0\n    FOR x <-- 2 TO 9\n        Total <-- Total + CompetitorScore[i,x]\n    NEXT x\n\n    // Classify competitor based on trimmed total\n    IF Total >= 210 THEN\n        Qualified <-- Qualified + 1\n        Pos[i] <-- "Q"\n    ELSE IF Total >= 180 THEN\n        Reserve <-- Reserve + 1\n        Pos[i] <-- "R"\n    ELSE\n        Fail <-- Fail + 1\n        Pos[i] <-- "N"\n    ENDIF\nNEXT i\n\n// Output each competitor's result status\nOUTPUT "==============================================="\nOUTPUT "          ARCHERY QUALIFICATION RESULTS        "\nOUTPUT "==============================================="\nFOR y <-- 1 TO 30\n    IF Pos[y] = "Q" THEN\n        OUTPUT CompetitorName[y], " -> QUALIFIED FOR NEXT STAGE"\n    ELSE IF Pos[y] = "R" THEN\n        OUTPUT CompetitorName[y], " -> RESERVE CANDIDATE"\n    ELSE\n        OUTPUT CompetitorName[y], " -> NOT QUALIFIED"\n    ENDIF\nNEXT y\n\n// Output total numbers in each category\nOUTPUT "-----------------------------------------------"\nOUTPUT "SUMMARY STATISTICS:"\nOUTPUT "Total Qualified : ", Qualified\nOUTPUT "Total Reserves  : ", Reserve\nOUTPUT "Total Disqualified: ", Fail\nOUTPUT "==============================================="`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Proper boundary initialization and score accumulator resets.\n\nAO2 (Application): 6 Marks\n- Validation loop constraining archery scores strictly between 0 and 30.\n- Sorting algorithm isolating lowest (index 1) and highest (index 10) scores.\n\nAO3 (Evaluation): 6 Marks\n- Correct index slice iteration (2 TO 9) sum calculation.\n- Nested IF evaluation assigning correct classification status and updating counters.",
    evalPoints: [
      "Row-by-row bubble sort enables easy trimming of max/min values at array endpoints.",
      "Index slicing (2..9) discards extreme values.",
      "Summary counters provide aggregate insights for qualification analysis."
    ],
    language: "python"
  },
  {
    id: "2025-cs-paper-22-febmar-sportsclub",
    year: 2025,
    paper: "Paper 22 (Feb/Mar)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "String Validation, Uniqueness Check & Parallel Arrays",
    estimatedTime: "25 mins",
    question: "A sports club uses a 6-character alphanumeric code in MemberID[1000] and full names in Name[1000, 2] (First, Last).\n\nRequirements:\n1. Menu offering: 1 = Input new member, 2 = Output member list, 3 = Stop.\n2. Input & Validate membership code to ensure exactly 6 characters.\n3. Verify uniqueness of new code against existing members in MemberID[]. If duplicate, require new input.\n4. When unique, store code and prompt for First Name and Last Name in corresponding location.\n5. Output full list displaying Membership Code, First Name, and Last Name.\n6. Repeat until Stop is selected.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/22 Feb/Mar 2025) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\nStop <-- FALSE\n\nREPEAT\n    OUTPUT "=========================================="\n    OUTPUT "      SPORTS CLUB MEMBERSHIP PORTAL       "\n    OUTPUT "=========================================="\n    OUTPUT "1. Register New Member"\n    OUTPUT "2. Display All Members"\n    OUTPUT "3. Exit Program"\n    OUTPUT "Enter option (1-3):"\n    INPUT Choice\n\n    CASE OF Choice\n        1: REPEAT\n               OUTPUT "Enter new 6-character membership code:"\n               INPUT NewID\n                \n               WHILE LENGTH(NewID) <> 6\n                   OUTPUT "Error! Code must be EXACTLY 6 characters. Re-enter:"\n                   INPUT NewID\n               ENDWHILE\n\n               // Find first empty space in array\n               Count <-- 1\n               Found <-- FALSE\n               REPEAT\n                   IF MemberID[Count] = "" THEN\n                       Found <-- TRUE\n                   ELSE\n                       Count <-- Count + 1\n                   ENDIF\n               UNTIL Found = TRUE OR Count > 1000\n\n               // Check uniqueness against existing stored codes\n               Unique <-- TRUE\n               FOR i <-- 1 TO Count - 1\n                   IF MemberID[i] = NewID THEN\n                       Unique <-- FALSE\n                   ENDIF\n               NEXT i\n\n               IF Unique = FALSE THEN\n                   OUTPUT "Error: Membership ID already exists! Please try another."\n               ENDIF\n           UNTIL Unique = TRUE\n\n           // Store validated details\n           MemberID[Count] <-- NewID\n           OUTPUT "Enter First Name:"\n           INPUT Name[Count, 1]\n           OUTPUT "Enter Last Name:"\n           INPUT Name[Count, 2]\n           OUTPUT "Member successfully registered!"\n\n        2: // Output details of all registered members\n           Count <-- 1\n           WHILE Count <= 1000 AND MemberID[Count] <> ""\n               OUTPUT "ID: ", MemberID[Count], " | Name: ", Name[Count, 1], " ", Name[Count, 2]\n               Count <-- Count + 1\n           ENDWHILE\n\n           IF Count = 1 THEN\n               OUTPUT "No members recorded in database."\n           ENDIF\n\n        3: Stop <-- TRUE\n\n        OTHERWISE OUTPUT "Invalid choice! Enter 1, 2, or 3."\n    ENDCASE\nUNTIL Stop = TRUE`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- String length function check LENGTH(NewID) = 6.\n\nAO2 (Application): 6 Marks\n- Uniqueness comparison loop scanning active member array slots.\n- Synchronized updates across MemberID[] and 2D Name[,] array.\n\nAO3 (Evaluation): 6 Marks\n- Linear pointer search locating first empty element.\n- Full registry iteration loop producing clean output display.",
    evalPoints: [
      "LENGTH validation prevents improperly formatted identification strings.",
      "Uniqueness verification loop prevents duplicate record collisions.",
      "Sequential array filling ensures contiguous data packing."
    ],
    language: "python"
  },
  {
    id: "2024-cs-paper-21-runningclub",
    year: 2024,
    paper: "Paper 21 (Oct/Nov)",
    questionNumber: 15,
    marks: 15,
    subject: "Computer Science (0478)",
    topic: "Verification Entry, Array Sorting & Podium Identification",
    estimatedTime: "25 mins",
    question: "A running club has 200 members competing in a 1km race. MemberName[200] stores names and MemberTime[200] stores times in seconds.\n\nRequirements:\n1. Input member times twice and verify that the two entries match before storing.\n2. Count number of runners finishing under 240 seconds for certificates.\n3. Sort MemberTime[] and MemberName[] in ascending order of time.\n4. Output names and times of top 3 runners identified as First, Second, and Third.\n5. Output total number of certificates to be printed.",
    answer: `// ========================================================\n// Cambridge IGCSE CS (0478/21 Oct/Nov 2024) - Question 15\n// Solved by Rayan Sajid\n// ========================================================\n\nCertif <-- 0 \n\n// Input time with double-entry verification\nFOR a <-- 1 TO 200\n    REPEAT\n        OUTPUT "Enter run time in seconds for ", MemberName[a], ":"\n        INPUT time1\n        OUTPUT "Re-enter run time to verify for ", MemberName[a], ":"\n        INPUT time2\n        \n        IF time1 <> time2 THEN\n            OUTPUT "Mismatch detected! Please enter matching times."\n        ENDIF\n    UNTIL time1 = time2\n    \n    MemberTime[a] <-- time1\n    \n    IF MemberTime[a] < 240 THEN\n        Certif <-- Certif + 1\n    ENDIF\nNEXT a\n\n// Synchronized Bubble Sort (Ascending order of speed/time)\nFOR b <-- 1 TO 199\n    FOR c <-- 1 TO 199\n        IF MemberTime[c] > MemberTime[c+1] THEN\n            // Swap times\n            T1 <-- MemberTime[c] \n            MemberTime[c] <-- MemberTime[c+1]\n            MemberTime[c+1] <-- T1\n            \n            // Swap corresponding names\n            T2 <-- MemberName[c]\n            MemberName[c] <-- MemberName[c+1]\n            MemberName[c+1] <-- T2\n        ENDIF\n    NEXT c\nNEXT b\n\n// Output top 3 podium winners\nOUTPUT "==============================================="\nOUTPUT "             1KM RACE WINNERS                  "\nOUTPUT "==============================================="\nOUTPUT "FIRST PLACE  : ", MemberName[1], " with time: ", MemberTime[1], " seconds"\nOUTPUT "SECOND PLACE : ", MemberName[2], " with time: ", MemberTime[2], " seconds"\nOUTPUT "THIRD PLACE  : ", MemberName[3], " with time: ", MemberTime[3], " seconds"\nOUTPUT "-----------------------------------------------"\nOUTPUT "TOTAL CERTIFICATES TO PRINT (<240s): ", Certif\nOUTPUT "==============================================="`,
    markingCriteria: "AO1 (Knowledge): 3 Marks\n- Double-entry verification pattern (REPEAT...UNTIL time1 = time2).\n\nAO2 (Application): 6 Marks\n- Parallel element swapping across MemberTime[] and MemberName[].\n- Threshold evaluation counter for sub-240s runners.\n\nAO3 (Evaluation): 6 Marks\n- Ascending order sort putting fastest times (smallest numbers) at indices 1, 2, and 3.\n- Correct identification of First, Second, and Third place podium members.",
    evalPoints: [
      "Verification double-entry eliminates keystroke errors during live data capture.",
      "Synchronized array swapping maintains relational integrity between runner names and times.",
      "Ascending bubble sort places top 3 performance times directly at indices 1, 2, and 3."
    ],
    language: "python"
  }
];

export default function App() {
  const [questions] = useState(() => {
    const saved = localStorage.getItem('igcse_questions_repo');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState('All');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('igcse_questions_repo', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentRoute(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentRoute(path);
    setIsSidebarOpen(false);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
        } else {
          navigate('/repository');
          setTimeout(() => {
            const el = document.getElementById('global-search-input');
            if (el) el.focus();
          }, 100);
        }
      }
      if (e.key === 'Escape') {
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const stats = useMemo(() => {
    const totalQuestions = questions.length;
    const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);
    const years = [...new Set(questions.map(q => q.year))].sort((a,b) => b - a);
    const papers = [...new Set(questions.map(q => q.paper))];
    const subjects = [...new Set(questions.map(q => q.subject))];
    const topics = [...new Set(questions.map(q => q.topic))];
    
    return {
      totalQuestions,
      totalMarks,
      yearsCount: years.length,
      papersCount: papers.length,
      subjectsCount: subjects.length,
      topicsCount: topics.length,
      yearsList: years,
      subjectsList: subjects,
      papersList: papers
    };
  }, [questions]);

  const renderRouteContent = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return <LandingPage questions={questions} stats={stats} navigate={navigate} />;
    }

    if (currentRoute === '/repository') {
      return (
        <RepositoryPage
          questions={questions}
          stats={stats}
          navigate={navigate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedPaper={selectedPaper}
          setSelectedPaper={setSelectedPaper}
        />
      );
    }

    if (currentRoute.startsWith('/year/')) {
      const yearStr = currentRoute.replace('/year/', '');
      const yearNum = parseInt(yearStr, 10);
      const yearQuestions = questions.filter(q => q.year === yearNum);

      if (yearQuestions.length === 0) {
        return <NotFoundPage navigate={navigate} message={`No questions found for Year ${yearStr}`} />;
      }

      return <YearPage year={yearNum} questions={yearQuestions} navigate={navigate} />;
    }

    if (currentRoute.startsWith('/question/')) {
      const qId = currentRoute.replace('/question/', '');
      const foundQ = questions.find(q => q.id === qId);
      if (!foundQ) return <NotFoundPage navigate={navigate} message={`Question ID "${qId}" not found in database.`} />;
      return <QuestionDetailPage question={foundQ} allQuestions={questions} navigate={navigate} triggerToast={triggerToast} />;
    }

    // Dynamic slug matching fallback for custom or legacy URLs
    const customUrlMatch = currentRoute.match(/^\/(\d{4})\/([^\/]+)\/question-(\d+)$/);
    if (customUrlMatch) {
      const [_, year, paperSlug, qNum] = customUrlMatch;
      const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const foundQ = questions.find(
        q => q.year === parseInt(year, 10) && 
             normalize(q.paper) === normalize(paperSlug) && 
             q.questionNumber === parseInt(qNum, 10)
      );

      if (!foundQ) {
        return <NotFoundPage navigate={navigate} message={`Question ${qNum} for ${year} ${paperSlug} not found.`} />;
      }
      return <QuestionDetailPage question={foundQ} allQuestions={questions} navigate={navigate} triggerToast={triggerToast} />;
    }

    return <NotFoundPage navigate={navigate} message={`Page path "${currentRoute}" does not exist.`} />;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans flex flex-col selection:bg-[#1f6feb] selection:text-white">
      <header className="sticky top-0 z-40 bg-[#161b22]/90 backdrop-blur border-b border-[#30363d] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-1.5 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-white transition"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-[#238636] text-white p-1.5 rounded-md font-mono text-xs font-bold tracking-wider shadow-sm group-hover:bg-[#2ea043] transition">
              15M
            </div>
            <div>
              <span className="font-bold text-white tracking-tight flex items-center gap-1.5 text-sm md:text-base">
                IGCSE Computer Science Repo
                <span className="hidden sm:inline-block text-[10px] bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-1.5 py-0.5 rounded font-mono">
                  0478
                </span>
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          <button
            onClick={() => navigate('/')}
            className={`px-3 py-1.5 rounded-md transition ${currentRoute === '/' ? 'text-white bg-[#21262d]' : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]/50'}`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/repository')}
            className={`px-3 py-1.5 rounded-md transition ${currentRoute === '/repository' ? 'text-white bg-[#21262d]' : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]/50'}`}
          >
            Repository
          </button>
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d]/50 transition flex items-center gap-1">
              Years <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-full left-0 mt-1 w-36 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 hidden group-hover:block z-50">
              {stats.yearsList.map(y => (
                <button
                  key={y}
                  onClick={() => navigate(`/year/${y}`)}
                  className="w-full text-left px-3 py-1.5 text-xs text-[#c9d1d9] hover:bg-[#1f6feb] hover:text-white transition font-mono"
                >
                  Year {y}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate('/repository')}
            className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d] transition relative"
            title="Search Repository (Press /)"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden md:block w-64 bg-[#0d1117] border-r border-[#30363d] overflow-y-auto flex-shrink-0 text-xs font-mono">
          <SidebarContent questions={questions} stats={stats} navigate={navigate} currentRoute={currentRoute} />
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative w-72 bg-[#161b22] h-full border-r border-[#30363d] p-4 flex flex-col z-10 font-mono text-xs overflow-y-auto">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#30363d]">
                <span className="font-bold text-white text-sm">EXPLORER</span>
                <button onClick={() => setIsSidebarOpen(false)} className="text-[#8b949e] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent questions={questions} stats={stats} navigate={navigate} currentRoute={currentRoute} />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-[#0d1117] flex flex-col">
          {renderRouteContent()}
        </main>
      </div>

      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#1f6feb] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#388bfd] flex items-center space-x-2 text-xs font-mono animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-green-300" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

function SidebarContent({ questions, stats, navigate, currentRoute }) {
  const [openYears, setOpenYears] = useState({ 2025: true, 2024: true, 2023: true });

  const toggleYear = (y) => {
    setOpenYears(prev => ({ ...prev, [y]: !prev[y] }));
  };

  return (
    <div className="p-3 space-y-4">
      <div>
        <div className="text-[10px] font-bold text-[#8b949e] tracking-wider uppercase mb-2 px-2 flex items-center justify-between">
          <span>CS (0478) Explorer</span>
          <span className="text-[#58a6ff] font-normal">{stats.totalQuestions} Qs</span>
        </div>
        
        <div className="space-y-0.5">
          {stats.yearsList.map(year => {
            const isExpanded = openYears[year];
            const yearQs = questions.filter(q => q.year === year);
            const papers = [...new Set(yearQs.map(q => q.paper))];

            return (
              <div key={year} className="space-y-0.5">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center space-x-1.5 px-2 py-1 rounded text-[#c9d1d9] hover:bg-[#21262d] transition font-semibold"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#8b949e]" />
                  )}
                  <Folder className="w-3.5 h-3.5 text-[#d29922]" />
                  <span>Year {year}</span>
                  <span className="ml-auto text-[10px] text-[#8b949e] font-normal">({yearQs.length})</span>
                </button>

                {isExpanded && (
                  <div className="ml-4 pl-2 border-l border-[#30363d] space-y-1 my-0.5">
                    {papers.map(paper => {
                      const paperQs = yearQs.filter(q => q.paper === paper);

                      return (
                        <div key={paper} className="space-y-0.5">
                          <div className="flex items-center space-x-1.5 text-[#8b949e] px-1 py-0.5 text-[11px]">
                            <FolderOpen className="w-3 h-3 text-[#58a6ff]" />
                            <span className="font-medium text-[#c9d1d9]">{paper}</span>
                          </div>

                          <div className="ml-3 space-y-0.5">
                            {paperQs.map(q => {
                              const qPath = `/question/${q.id}`;
                              const isActive = currentRoute === qPath || currentRoute === `/question/${q.id}`;

                              return (
                                <button
                                  key={q.id}
                                  onClick={() => navigate(qPath)}
                                  className={`w-full text-left truncate px-2 py-1 rounded text-[11px] flex items-center justify-between transition ${
                                    isActive
                                      ? 'bg-[#1f6feb]/20 text-[#58a6ff] border border-[#1f6feb]/40 font-semibold'
                                      : 'text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]'
                                  }`}
                                  title={`${q.subject} - Q${q.questionNumber}`}
                                >
                                  <span className="flex items-center space-x-1 truncate">
                                    <FileCode className="w-3 h-3 flex-shrink-0 text-[#79c0ff]" />
                                    <span>Q{q.questionNumber} - {q.topic.split(' ')[0]}</span>
                                  </span>
                                  <span className="text-[9px] bg-[#21262d] px-1 rounded text-[#7d8590]">15m</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LandingPage({ questions, stats, navigate }) {
  const previewQuestion = questions[0];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-12">
      <section className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center space-x-2 bg-[#21262d] border border-[#30363d] px-3 py-1 rounded-full text-xs font-mono text-[#58a6ff]">
          <span className="w-2 h-2 rounded-full bg-[#238636] animate-pulse"></span>
          <span>Computer Science (0478) Model Answer Archive</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          IGCSE CS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#bc8cff]">15-Marker</span> Repository
        </h1>

        <p className="text-[#8b949e] text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
          A structured archive of IGCSE Computer Science (0478) 15-mark examination questions, algorithms, mark schemes, and detailed breakdowns.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/repository')}
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center space-x-2 shadow-lg transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Repository</span>
          </button>
          <button
            onClick={() => navigate('/repository')}
            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-5 py-2.5 rounded-md font-medium text-sm flex items-center space-x-2 transition"
          >
            <Search className="w-4 h-4 text-[#8b949e]" />
            <span>Search Questions</span>
          </button>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-[#1f6feb]/10 rounded-md text-[#58a6ff]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">{stats.totalMarks}</div>
            <div className="text-xs text-[#8b949e]">Total Marks Archived</div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-[#238636]/10 rounded-md text-[#3fb950]">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">{stats.totalQuestions}</div>
            <div className="text-xs text-[#8b949e]">15-Mark Questions</div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-[#d29922]/10 rounded-md text-[#d29922]">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">{stats.yearsCount}</div>
            <div className="text-xs text-[#8b949e]">Years Covered</div>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex items-center space-x-3 shadow-sm">
          <div className="p-2.5 bg-[#bc8cff]/10 rounded-md text-[#bc8cff]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">{stats.topicsCount}</div>
            <div className="text-xs text-[#8b949e]">CS Syllabus Topics</div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[#58a6ff]" />
            <h2 className="text-base font-bold text-white font-mono">LIVE_EDITOR_PREVIEW.py</h2>
          </div>
          <span className="text-xs text-[#8b949e] font-mono">Interactive Model Answer View</span>
        </div>

        <AnswerEditor question={previewQuestion} readOnly={true} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#58a6ff]" />
            Browse CS Archives by Year
          </h2>
          <span className="text-xs text-[#8b949e] font-mono">Click to filter</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.yearsList.map(year => {
            const yearQs = questions.filter(q => q.year === year);

            return (
              <div
                key={year}
                onClick={() => navigate(`/year/${year}`)}
                className="bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] p-5 rounded-lg cursor-pointer transition group shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xl font-bold font-mono text-white group-hover:text-[#58a6ff] transition">
                      Year {year}
                    </span>
                    <span className="bg-[#21262d] text-[#58a6ff] text-xs px-2 py-0.5 rounded border border-[#30363d] font-mono">
                      {yearQs.length} Questions
                    </span>
                  </div>
                  <p className="text-xs text-[#8b949e]">
                    Paper 1 (Theory) & Paper 2 (Algorithms / Problem Solving)
                  </p>
                </div>

                <div className="flex items-center text-xs text-[#58a6ff] font-medium pt-2 border-t border-[#21262d]">
                  <span>Explore Year {year} CS Questions</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function RepositoryPage({
  questions,
  stats,
  navigate,
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedPaper,
  setSelectedPaper
}) {
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch =
        searchQuery === '' ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.year.toString().includes(searchQuery);

      const matchesYear = selectedYear === 'All' || q.year.toString() === selectedYear;
      const matchesPaper = selectedPaper === 'All' || q.paper === selectedPaper;

      return matchesSearch && matchesYear && matchesPaper;
    });
  }, [questions, searchQuery, selectedYear, selectedPaper]);

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#58a6ff]" />
          Computer Science (0478) Repository Index
        </h1>
        <p className="text-xs text-[#8b949e] mt-1 font-mono">
          Search and filter across {stats.totalQuestions} past paper 15-mark questions.
        </p>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-3 text-[#8b949e]" />
        <input
          id="global-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search question text, model answers, algorithms, or topics... (Press '/' to focus, 'ESC' to clear)"
          className="w-full bg-[#161b22] border border-[#30363d] focus:border-[#58a6ff] text-white pl-11 pr-24 py-2.5 rounded-lg text-sm outline-none transition font-sans placeholder-[#484f58]"
        />
        <div className="absolute right-3 top-2.5 flex items-center gap-1">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs bg-[#21262d] text-[#8b949e] hover:text-white px-2 py-1 rounded border border-[#30363d]"
            >
              Clear
            </button>
          )}
          <span className="hidden sm:inline-block text-[10px] font-mono bg-[#21262d] border border-[#30363d] text-[#8b949e] px-1.5 py-1 rounded">
            /
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#161b22] p-3.5 rounded-lg border border-[#30363d]">
        <div>
          <label className="text-[11px] font-mono text-[#8b949e] block mb-1">Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] text-xs text-[#c9d1d9] p-2 rounded outline-none focus:border-[#58a6ff]"
          >
            <option value="All">All Years</option>
            {stats.yearsList.map(y => <option key={y} value={y.toString()}>{y}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[11px] font-mono text-[#8b949e] block mb-1">Paper</label>
          <select
            value={selectedPaper}
            onChange={(e) => setSelectedPaper(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] text-xs text-[#c9d1d9] p-2 rounded outline-none focus:border-[#58a6ff]"
          >
            <option value="All">All Papers</option>
            {stats.papersList.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-[#8b949e] px-1">
          <span>Showing {filteredQuestions.length} of {questions.length} Questions</span>
          {(selectedYear !== 'All' || selectedPaper !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedYear('All');
                setSelectedPaper('All');
                setSearchQuery('');
              }}
              className="text-[#58a6ff] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-[#161b22] border border-[#30363d] p-8 rounded-lg text-center space-y-3">
            <HelpCircle className="w-10 h-10 text-[#8b949e] mx-auto opacity-50" />
            <h3 className="text-white font-semibold text-sm">No questions match your query</h3>
            <p className="text-xs text-[#8b949e]">Try clearing filters or searching for alternative keywords like 'algorithm', 'pseudocode', 'array', or 'sql'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredQuestions.map(q => {
              const targetUrl = `/question/${q.id}`;

              return (
                <div
                  key={q.id}
                  onClick={() => navigate(targetUrl)}
                  className="bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] p-4 rounded-lg cursor-pointer transition group shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="bg-[#1f6feb]/10 text-[#58a6ff] px-2 py-0.5 rounded border border-[#1f6feb]/30">
                        {q.subject}
                      </span>
                      <span className="bg-[#21262d] text-[#c9d1d9] px-2 py-0.5 rounded border border-[#30363d]">
                        {q.year} • {q.paper}
                      </span>
                      <span className="bg-[#238636]/10 text-[#3fb950] px-2 py-0.5 rounded border border-[#238636]/30">
                        {q.marks} Marks
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white group-hover:text-[#58a6ff] transition line-clamp-2">
                      Q{q.questionNumber}: {q.question}
                    </h3>

                    <div className="text-xs text-[#8b949e] flex items-center gap-2">
                      <span className="text-[#bc8cff]">Topic: {q.topic}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-[#58a6ff] font-mono group-hover:translate-x-1 transition flex-shrink-0">
                    <span>Open Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function YearPage({ year, questions, navigate }) {
  const papers = [...new Set(questions.map(q => q.paper))];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-[#30363d] pb-4">
        <div>
          <button
            onClick={() => navigate('/repository')}
            className="text-xs text-[#58a6ff] hover:underline flex items-center gap-1 mb-1 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Repository
          </button>
          <h1 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#d29922]" />
            CS Examination Archive — {year}
          </h1>
        </div>
        <span className="bg-[#21262d] text-[#58a6ff] border border-[#30363d] px-3 py-1 rounded text-xs font-mono">
          {questions.length} Questions Found
        </span>
      </div>

      {papers.map(paper => {
        const paperQs = questions.filter(q => q.paper === paper);

        return (
          <div key={paper} className="space-y-3">
            <h2 className="text-base font-bold text-[#c9d1d9] font-mono flex items-center gap-2 bg-[#161b22] px-3 py-2 rounded border border-[#30363d]">
              <FolderOpen className="w-4 h-4 text-[#58a6ff]" />
              {paper} ({paperQs.length} 15-Markers)
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {paperQs.map(q => {
                const qPath = `/question/${q.id}`;

                return (
                  <div
                    key={q.id}
                    onClick={() => navigate(qPath)}
                    className="bg-[#0d1117] border border-[#30363d] hover:border-[#58a6ff] p-4 rounded-lg cursor-pointer transition group flex justify-between items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-[#3fb950] font-bold">Q{q.questionNumber}</span>
                        <span className="text-[#8b949e]">|</span>
                        <span className="text-[#bc8cff]">{q.topic}</span>
                      </div>
                      <p className="text-sm font-medium text-white group-hover:text-[#58a6ff] transition line-clamp-1">
                        {q.question}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#8b949e] group-hover:text-[#58a6ff] group-hover:translate-x-1 transition flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function QuestionDetailPage({ question, allQuestions, navigate, triggerToast }) {
  const currentIndex = allQuestions.findIndex(q => q.id === question.id);
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null;
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null;

  const peerQuestions = allQuestions.filter(q => q.year === question.year && q.paper === question.paper);

  const getQuestionPath = (q) => `/question/${q.id}`;

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
      <nav className="flex items-center space-x-2 text-xs font-mono text-[#8b949e] overflow-x-auto pb-1">
        <button onClick={() => navigate('/')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/repository')} className="hover:text-white transition">Repository</button>
        <span>/</span>
        <button onClick={() => navigate(`/year/${question.year}`)} className="hover:text-white transition">{question.year}</button>
        <span>/</span>
        <span className="text-[#c9d1d9] truncate">{question.paper}</span>
        <span>/</span>
        <span className="text-[#58a6ff] font-semibold">Q{question.questionNumber}</span>
      </nav>

      <div className="bg-[#161b22] border border-[#30363d] p-5 rounded-lg space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-[#238636] text-white px-2.5 py-1 rounded font-bold shadow-sm">
              15 Marks
            </span>
            <span className="bg-[#1f6feb]/20 text-[#58a6ff] px-2.5 py-1 rounded border border-[#1f6feb]/40">
              {question.subject}
            </span>
            <span className="bg-[#21262d] text-[#c9d1d9] px-2.5 py-1 rounded border border-[#30363d]">
              {question.year} • {question.paper} • Question {question.questionNumber}
            </span>
          </div>

          <span className="text-xs font-mono text-[#8b949e] flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#d29922]" />
            Est. Time: {question.estimatedTime || "25 mins"}
          </span>
        </div>

        <div>
          <span className="text-xs font-mono text-[#bc8cff] uppercase tracking-wider block mb-0.5">TOPIC AREA</span>
          <h1 className="text-lg font-bold text-white">{question.topic}</h1>
        </div>
      </div>

      <div className="bg-[#161b22] border-l-4 border-l-[#58a6ff] border border-[#30363d] p-5 rounded-r-lg space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[#8b949e]">
          <span className="font-bold text-white">EXAMINATION QUESTION PROMPT</span>
          <span>15 MARKS</span>
        </div>
        <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed whitespace-pre-line font-medium">
          {question.question}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#8b949e] flex items-center gap-1.5">
            <Code className="w-4 h-4 text-[#3fb950]" />
            MODEL ANSWER & EXAMINER BREAKDOWN
          </span>
        </div>

        <AnswerEditor question={question} triggerToast={triggerToast} />
      </div>

      <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg space-y-3">
        <div className="text-xs font-mono text-[#8b949e] flex items-center justify-between">
          <span>PEER QUESTIONS ({question.year} {question.paper})</span>
          <span>Select Question</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {peerQuestions.map(q => {
            const isActive = q.id === question.id;

            return (
              <button
                key={q.id}
                onClick={() => navigate(getQuestionPath(q))}
                className={`px-3 py-1.5 rounded font-mono text-xs transition ${
                  isActive
                    ? 'bg-[#1f6feb] text-white font-bold shadow-md'
                    : 'bg-[#21262d] text-[#8b949e] hover:text-white hover:bg-[#30363d]'
                }`}
              >
                Q{q.questionNumber}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {prevQuestion ? (
          <button
            onClick={() => navigate(getQuestionPath(prevQuestion))}
            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-4 py-2 rounded-md text-xs font-mono flex items-center gap-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: Q{prevQuestion.questionNumber}</span>
          </button>
        ) : <div />}

        <button
          onClick={() => navigate('/repository')}
          className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#58a6ff] px-4 py-2 rounded-md text-xs font-mono transition"
        >
          Back to Index
        </button>

        {nextQuestion ? (
          <button
            onClick={() => navigate(getQuestionPath(nextQuestion))}
            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-4 py-2 rounded-md text-xs font-mono flex items-center gap-2 transition"
          >
            <span>Next: Q{nextQuestion.questionNumber}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

function AnswerEditor({ question, readOnly = false, triggerToast }) {
  const [activeTab, setActiveTab] = useState('answer');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(13);
  const [lineWrap, setLineWrap] = useState(true);

  const activeContent = useMemo(() => {
    if (activeTab === 'answer') return question.answer;
    if (activeTab === 'criteria') return question.markingCriteria || "No marking scheme provided.";
    if (activeTab === 'points') return JSON.stringify(question.evalPoints || [], null, 2);
    return '';
  }, [activeTab, question]);

  const lines = useMemo(() => {
    return activeContent.split('\n');
  }, [activeContent]);

  const wordCount = useMemo(() => {
    return activeContent.trim().split(/\s+/).filter(Boolean).length;
  }, [activeContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    if (triggerToast) triggerToast("Copied content to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const renderFormattedLine = (line) => {
    if (activeTab === 'points') {
      return <span className="text-[#a5d6ff]">{line}</span>;
    }

    if (question.language === 'python' && activeTab === 'answer') {
      if (line.trim().startsWith('#')) return <span className="text-[#8b949e] italic">{line}</span>;
      if (line.includes('DECLARE') || line.includes('FOR') || line.includes('IF') || line.includes('UNTIL')) {
        return <span className="text-[#ff7b72] font-semibold">{line}</span>;
      }
      return <span className="text-[#c9d1d9]">{line}</span>;
    }

    const connectives = ["However", "Therefore", "In conclusion", "Furthermore", "Conversely", "Firstly", "Secondly"];
    
    let lineElements = [line];

    connectives.forEach(word => {
      const nextElements = [];
      lineElements.forEach(item => {
        if (typeof item === 'string') {
          const parts = item.split(new RegExp(`(${word})`, 'gi'));
          parts.forEach((part, i) => {
            if (part.toLowerCase() === word.toLowerCase()) {
              nextElements.push(
                <span key={i} className="text-[#d29922] font-bold underline decoration-[#d29922]/40">
                  {part}
                </span>
              );
            } else {
              nextElements.push(part);
            }
          });
        } else {
          nextElements.push(item);
        }
      });
      lineElements = nextElements;
    });

    return <span className="text-[#c9d1d9]">{lineElements}</span>;
  };

  return (
    <div className={`bg-[#0d1117] border border-[#30363d] rounded-lg overflow-hidden flex flex-col font-mono shadow-2xl transition-all ${
      isFullscreen ? 'fixed inset-2 z-50 rounded-lg' : 'w-full'
    }`}>
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center justify-between px-2 pt-2 overflow-x-auto">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('answer')}
            className={`px-3 py-1.5 rounded-t-md text-xs flex items-center gap-1.5 border-t-2 transition ${
              activeTab === 'answer'
                ? 'bg-[#0d1117] text-[#58a6ff] border-t-[#58a6ff] border-x border-[#30363d] font-semibold'
                : 'text-[#8b949e] border-t-transparent hover:bg-[#21262d]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>answer.{question.language === 'python' ? 'py' : 'txt'}</span>
          </button>

          <button
            onClick={() => setActiveTab('criteria')}
            className={`px-3 py-1.5 rounded-t-md text-xs flex items-center gap-1.5 border-t-2 transition ${
              activeTab === 'criteria'
                ? 'bg-[#0d1117] text-[#3fb950] border-t-[#3fb950] border-x border-[#30363d] font-semibold'
                : 'text-[#8b949e] border-t-transparent hover:bg-[#21262d]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>marking-criteria.md</span>
          </button>

          <button
            onClick={() => setActiveTab('points')}
            className={`px-3 py-1.5 rounded-t-md text-xs flex items-center gap-1.5 border-t-2 transition ${
              activeTab === 'points'
                ? 'bg-[#0d1117] text-[#bc8cff] border-t-[#bc8cff] border-x border-[#30363d] font-semibold'
                : 'text-[#8b949e] border-t-transparent hover:bg-[#21262d]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>eval-points.json</span>
          </button>
        </div>

        <div className="flex items-center space-x-1 pb-1 text-[#8b949e]">
          <button
            onClick={() => setFontSize(prev => Math.max(10, prev - 1))}
            className="p-1 hover:text-white rounded hover:bg-[#21262d]"
            title="Decrease Font Size"
          >
            <Type className="w-3 h-3" />
          </button>
          <button
            onClick={() => setFontSize(prev => Math.min(18, prev + 1))}
            className="p-1 hover:text-white rounded hover:bg-[#21262d]"
            title="Increase Font Size"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLineWrap(!lineWrap)}
            className={`p-1 rounded transition ${lineWrap ? 'text-[#58a6ff] bg-[#21262d]' : 'hover:text-white hover:bg-[#21262d]'}`}
            title="Toggle Word Wrap"
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 hover:text-white rounded hover:bg-[#21262d] flex items-center gap-1 text-xs px-2"
            title="Copy Buffer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          {!readOnly && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:text-white rounded hover:bg-[#21262d]"
              title="Fullscreen Toggle"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      <div
        className="flex-1 overflow-auto p-4 flex font-mono leading-relaxed"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="select-none text-right pr-4 text-[#484f58] border-r border-[#30363d] space-y-0.5 min-w-[2.5rem]">
          {lines.map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </div>

        <div className={`pl-4 flex-1 space-y-0.5 ${lineWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
          {lines.map((line, idx) => (
            <div key={idx} className="hover:bg-[#161b22] px-1 rounded transition">
              {renderFormattedLine(line)}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#161b22] border-t border-[#30363d] px-3 py-1 flex items-center justify-between text-[11px] text-[#8b949e]">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#238636]"></span>
            <span>UTF-8</span>
          </span>
          <span>{lines.length} Lines</span>
          <span>{wordCount} Words</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>IGCSE Standard</span>
          <span className="text-[#58a6ff]">15/15 Marks Grade A*</span>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage({ navigate, message }) {
  return (
    <div className="p-8 max-w-2xl mx-auto my-auto text-center space-y-6">
      <div className="bg-[#161b22] border border-[#ff7b72]/40 p-6 rounded-lg space-y-4 shadow-xl">
        <div className="inline-flex items-center space-x-2 bg-[#ff7b72]/10 text-[#ff7b72] px-3 py-1 rounded-full text-xs font-mono">
          <Info className="w-4 h-4" />
          <span>DIAGNOSTIC ERROR 404: RESOURCE_NOT_FOUND</span>
        </div>

        <h1 className="text-xl font-bold text-white font-mono">Question or Route Exists Outside Archive</h1>

        <p className="text-xs text-[#8b949e] font-mono leading-relaxed bg-[#0d1117] p-3 rounded border border-[#30363d]">
          {message || "The requested route could not be mapped to any entry in the repository questions database."}
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/repository')}
            className="bg-[#1f6feb] hover:bg-[#388bfd] text-white px-4 py-2 rounded text-xs font-mono transition"
          >
            Return to Index
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] px-4 py-2 rounded text-xs font-mono transition"
          >
            Home Landing
          </button>
        </div>
      </div>
    </div>
  );
}
