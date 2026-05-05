const siteData = {
  "modules": [
    {
      "id": "company_formation",
      "name": "Company Formation",
      "topics": [
        {
          "id": "cf_incorporation",
          "title": "Incorporation of Company",
          "oneMinuteRevision": [
            "A company is a separate legal entity distinct from its members.",
            "Incorporation requires filing documents like MoA, AoA, and declarations with the Registrar.",
            "Certificate of Incorporation is conclusive evidence of compliance."
          ],
          "keySections": ["Sec 3", "Sec 7", "Sec 9"],
          "coreConcepts": [
            "Separate Legal Entity: Company can sue, be sued, hold property.",
            "Limited Liability: Member liability is limited to the unpaid amount on shares.",
            "Perpetual Succession: Death of members does not affect the company's existence."
          ],
          "commonExamTraps": [
            "Confusing the effect of incorporation (Sec 9) with pre-incorporation contracts.",
            "Forgetting that promoters are personally liable for pre-incorporation contracts until ratified."
          ],
          "importantCase": {
            "name": "Salomon v A Salomon & Co Ltd",
            "summary": "Established the fundamental principle of separate legal personality of a company."
          }
        },
        {
          "id": "cf_moa_aoa",
          "title": "Memorandum & Articles of Association",
          "oneMinuteRevision": [
            "MoA is the charter defining the company's constitution and scope.",
            "AoA contains the internal rules and regulations.",
            "Both can be altered, but MoA alteration is stricter."
          ],
          "keySections": ["Sec 4", "Sec 5", "Sec 13", "Sec 14"],
          "coreConcepts": [
            "Doctrine of Ultra Vires: Acts beyond the MoA are void and cannot be ratified.",
            "Doctrine of Constructive Notice: Outsiders are presumed to know the MoA and AoA.",
            "Doctrine of Indoor Management: Outsiders can assume internal procedures are followed."
          ],
          "commonExamTraps": [
            "Applying the Doctrine of Indoor Management when the outsider had knowledge of irregularity.",
            "Assuming an ultra vires act can be ratified by a unanimous shareholder vote (it cannot)."
          ],
          "importantCase": {
            "name": "Royal British Bank v Turquand",
            "summary": "Established the Doctrine of Indoor Management, protecting innocent outsiders dealing with a company."
          }
        }
      ]
    },
    {
      "id": "share_capital",
      "name": "Share Capital",
      "topics": [
        {
          "id": "sc_issue",
          "title": "Issue of Share Capital",
          "oneMinuteRevision": [
            "Shares can be issued at par or at a premium.",
            "Issue at a discount is generally prohibited.",
            "Requires board resolution and sometimes ordinary resolution."
          ],
          "keySections": ["Sec 43", "Sec 52", "Sec 53"],
          "coreConcepts": [
            "Equity vs. Preference Shares: Equity carries voting rights, preference carries preferential dividend.",
            "Securities Premium: Can only be used for specific purposes like bonus shares or writing off preliminary expenses.",
            "Sweat Equity: Issued to employees/directors at a discount for value addition."
          ],
          "commonExamTraps": [
            "Confusing the utilization of securities premium account.",
            "Forgetting that issue of shares at a discount is void except for sweat equity."
          ],
          "importantCase": {
            "name": "Ooregum Gold Mining Co of India v Roper",
            "summary": "Established the principle that shares cannot be issued at a discount to their nominal value."
          }
        },
        {
          "id": "sc_alteration",
          "title": "Alteration of Share Capital",
          "oneMinuteRevision": [
            "Company can alter share capital if authorized by Articles.",
            "Requires ordinary resolution in general meeting.",
            "Notice must be given to the Registrar within 30 days."
          ],
          "keySections": ["Sec 61", "Sec 64"],
          "coreConcepts": [
            "Increase of authorized capital.",
            "Consolidation and division of shares.",
            "Conversion of shares into stock and vice versa.",
            "Cancellation of unissued shares."
          ],
          "commonExamTraps": [
            "Thinking alteration requires special resolution (it usually requires ordinary).",
            "Confusing alteration with reduction of capital (reduction requires tribunal approval)."
          ],
          "importantCase": {
            "name": "Re: North Cheshire & Birkenhead Beneficent Society",
            "summary": "Clarified procedures and limits of altering authorized share capital under statutory provisions."
          }
        },
        {
          "id": "sc_buyback",
          "title": "Buy-back of Shares",
          "oneMinuteRevision": [
            "Company can purchase its own shares out of free reserves, securities premium, or proceeds of a fresh issue.",
            "Must be authorized by articles and requires special resolution (or board resolution for smaller amounts).",
            "Post buy-back debt-equity ratio cannot exceed 2:1."
          ],
          "keySections": ["Sec 68", "Sec 69", "Sec 70"],
          "coreConcepts": [
            "Limits: Buy-back cannot exceed 25% of total paid-up capital and free reserves.",
            "Capital Redemption Reserve (CRR): Must be created out of free reserves equivalent to nominal value of shares bought back.",
            "Time Limit: Must be completed within 1 year from the date of resolution."
          ],
          "commonExamTraps": [
            "Forgetting to calculate the 25% limit properly (it includes free reserves).",
            "Not recognizing that a fresh issue made specifically for buy-back cannot be of the same kind of shares."
          ],
          "importantCase": {
            "name": "Trevor v Whitworth",
            "summary": "Historically established that a company cannot purchase its own shares, leading to strict modern statutory exceptions."
          }
        }
      ]
    },
    {
      "id": "directors_board",
      "name": "Directors & Board",
      "topics": [
        {
          "id": "dir_appointment",
          "title": "Appointment of Directors",
          "oneMinuteRevision": [
            "Every public company must have at least 3 directors, private company 2.",
            "First directors are usually named in Articles.",
            "Subsequent directors appointed in General Meeting."
          ],
          "keySections": ["Sec 149", "Sec 152", "Sec 161"],
          "coreConcepts": [
            "DIN (Director Identification Number) is mandatory.",
            "Independent Directors: Required for listed companies and specified unlisted public companies.",
            "Additional Directors: Appointed by the Board, hold office till next AGM.",
            "Women Director: Mandatory for certain classes of companies."
          ],
          "commonExamTraps": [
            "Ignoring the rotation requirement (2/3rd of total directors must be liable to retire by rotation in public companies).",
            "Misunderstanding the tenure of an Additional Director."
          ],
          "importantCase": {
            "name": "Percival v Wright",
            "summary": "Directors owe fiduciary duties to the company as a whole, not to individual shareholders."
          }
        },
        {
          "id": "dir_duties",
          "title": "Duties of Directors",
          "oneMinuteRevision": [
            "Directors must act in good faith to promote the objects of the company.",
            "Must exercise reasonable care, skill, and diligence.",
            "Must avoid conflicts of interest."
          ],
          "keySections": ["Sec 166"],
          "coreConcepts": [
            "Fiduciary Duty: Act honestly and in the best interests of the company.",
            "Duty of Care: Standard of a reasonably prudent person.",
            "Non-delegation: Cannot assign their office; any such assignment is void."
          ],
          "commonExamTraps": [
            "Assuming directors can freely profit from corporate opportunities without disclosure.",
            "Forgetting that the duty is owed to the company, not to the majority shareholder."
          ],
          "importantCase": {
            "name": "Regal (Hastings) Ltd v Gulliver",
            "summary": "Directors are liable to account for profits made from their position, even if the company suffered no loss and acted in good faith."
          }
        },
        {
          "id": "dir_meetings",
          "title": "Board Meetings",
          "oneMinuteRevision": [
            "First meeting must be held within 30 days of incorporation.",
            "Minimum 4 meetings per year with a maximum gap of 120 days.",
            "At least 7 days written notice required."
          ],
          "keySections": ["Sec 173", "Sec 174"],
          "coreConcepts": [
            "Quorum: 1/3rd of total strength or 2 directors, whichever is higher.",
            "Participation: Can attend in person or through video conferencing.",
            "Interested Directors: Cannot vote and are not counted for quorum on that specific agenda."
          ],
          "commonExamTraps": [
            "Confusing the quorum of Board Meetings with General Meetings.",
            "Forgetting that interested directors cannot participate in voting on related matters."
          ],
          "importantCase": {
            "name": "Barron v Potter",
            "summary": "If the board is deadlocked or unable to act, the power to act reverts to the shareholders in general meeting."
          }
        }
      ]
    },
    {
      "id": "meetings",
      "name": "Meetings",
      "topics": [
        {
          "id": "mtg_agm",
          "title": "Annual General Meeting (AGM)",
          "oneMinuteRevision": [
            "Must be held every year by all companies (except OPC).",
            "Max gap between two AGMs is 15 months.",
            "Must be called during business hours on a day that is not a National Holiday."
          ],
          "keySections": ["Sec 96", "Sec 101", "Sec 102"],
          "coreConcepts": [
            "Ordinary Business: Dividend declaration, consideration of accounts, appointment of directors/auditors.",
            "Special Business: Any other business, requires an explanatory statement.",
            "Notice: 21 clear days' notice is required."
          ],
          "commonExamTraps": [
            "Failing to exclude the day of sending notice and the day of meeting when calculating '21 clear days'.",
            "Confusing National Holiday with public holidays (AGM can be held on a Sunday if it's not a National Holiday)."
          ],
          "importantCase": {
            "name": "Foss v Harbottle",
            "summary": "Established the 'majority rule' principle: courts will not interfere in internal irregularities if the majority can ratify them."
          }
        },
        {
          "id": "mtg_egm",
          "title": "Extraordinary General Meeting (EGM)",
          "oneMinuteRevision": [
            "Any general meeting other than the AGM.",
            "Can be called by the Board, or on requisition by shareholders.",
            "Tribunal can also order an EGM."
          ],
          "keySections": ["Sec 100", "Sec 98"],
          "coreConcepts": [
            "Requisitionists: Must hold at least 10% of paid-up capital with voting rights.",
            "Timeline: Board must proceed to call it within 21 days; if not, requisitionists can hold it within 3 months.",
            "All business transacted at an EGM is special business."
          ],
          "commonExamTraps": [
            "Assuming ordinary business can be transacted at an EGM.",
            "Forgetting the required shareholding threshold for making a valid requisition."
          ],
          "importantCase": {
            "name": "Life Insurance Corp of India v Escorts Ltd",
            "summary": "Shareholders calling an EGM via requisition do not need to state the reasons for the resolution proposed."
          }
        }
      ]
    },
    {
      "id": "mergers",
      "name": "Mergers & Acquisitions",
      "topics": [
        {
          "id": "ma_compromise",
          "title": "Compromise & Arrangements",
          "oneMinuteRevision": [
            "Involves a scheme between company and its creditors or members.",
            "Requires approval from Tribunal (NCLT).",
            "Must be approved by majority in number representing 3/4th in value."
          ],
          "keySections": ["Sec 230", "Sec 231", "Sec 232"],
          "coreConcepts": [
            "Amalgamation: Two or more companies merge to form a new company.",
            "Demerger: A company transfers one or more of its undertakings to another company.",
            "Meeting ordered by Tribunal is mandatory to get member/creditor approval."
          ],
          "commonExamTraps": [
            "Confusing the dual majority requirement: majority in 'number' AND 3/4th in 'value' of those present and voting.",
            "Thinking board approval alone is sufficient for a restructuring."
          ],
          "importantCase": {
            "name": "Miheer H. Mafatlal v Mafatlal Industries Ltd",
            "summary": "Tribunal's role is not to sit as an appellate authority over commercial wisdom, but to ensure statutory compliance and fairness."
          }
        },
        {
          "id": "ma_fast_track",
          "title": "Fast Track Mergers",
          "oneMinuteRevision": [
            "Simplified procedure without needing NCLT approval.",
            "Applicable only to small companies, holding/wholly-owned subsidiaries, or startups.",
            "Approved by Central Government (Regional Director)."
          ],
          "keySections": ["Sec 233"],
          "coreConcepts": [
            "Notice must be given to Registrar and Official Liquidator for objections.",
            "Requires approval of 90% of total number of shares.",
            "Requires approval of 9/10th in value of creditors."
          ],
          "commonExamTraps": [
            "Assuming fast track merger is available for all private companies (it's mostly for small companies and specific setups).",
            "Forgetting that Regional Director has the power to shift it to the normal NCLT route if he finds it against public interest."
          ],
          "importantCase": {
            "name": "N/A (Statutory Procedure)",
            "summary": "Focus on the strict procedural timelines and threshold requirements as there are fewer landmark cases here."
          }
        }
      ]
    },
    {
      "id": "winding_up",
      "name": "Winding Up",
      "topics": [
        {
          "id": "wu_tribunal",
          "title": "Winding Up by Tribunal",
          "oneMinuteRevision": [
            "Compulsory winding up ordered by NCLT.",
            "Grounds include inability to pay debts, special resolution, or just & equitable grounds.",
            "Liquidator takes over control of company assets."
          ],
          "keySections": ["Sec 271", "Sec 272"],
          "coreConcepts": [
            "Just & Equitable Ground: Loss of substratum, deadlock in management, fraud.",
            "Official Liquidator: Appointed by Tribunal to conduct proceedings.",
            "Fraudulent Preference: Transactions favoring certain creditors before winding up are void."
          ],
          "commonExamTraps": [
            "Confusing voluntary winding up (governed by IBC 2016) with winding up by Tribunal (Companies Act).",
            "Misinterpreting 'inability to pay debts' without referencing the statutory notice period."
          ],
          "importantCase": {
            "name": "Yenidje Tobacco Co Ltd, Re",
            "summary": "A company can be wound up on 'just and equitable' grounds if there is a complete deadlock in management (similar to partnership dissolution)."
          }
        },
        {
          "id": "wu_waterfall",
          "title": "Priority of Payments (Waterfall)",
          "oneMinuteRevision": [
            "Dictates the order in which proceeds from asset realization are distributed.",
            "Workmen's dues and secured creditors rank equally highest.",
            "Equity shareholders are paid last."
          ],
          "keySections": ["Sec 326", "Sec 327"],
          "coreConcepts": [
            "Overriding Preferential Payments: Workmen dues and secured creditors.",
            "Preferential Payments: Taxes, employee wages (non-workmen), holiday remuneration.",
            "Floating Charges: Invalid if created within 12 months of winding up unless company was solvent."
          ],
          "commonExamTraps": [
            "Placing government dues above workmen's dues (workmen and secured creditors have overriding priority).",
            "Forgetting the exact rank of floating charge holders."
          ],
          "importantCase": {
            "name": "Swiss Ribbons Pvt Ltd v Union of India",
            "summary": "Upheld the constitutionality of the IBC waterfall mechanism and differentiation between financial and operational creditors."
          }
        }
      ]
    }
  ]
};
