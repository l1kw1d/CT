/**
 * Club Touriste — Configuration CookieConsent v3
 * Conforme à la Loi 25 du Québec
 * 
 * Ce fichier doit être placé dans /js/cookieconsent-config.js
 * Il doit être inclus sur CHAQUE page HTML du site (index, menu, midi, etc.)
 * 
 * Dans le <head> de chaque page, ajouter :
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css">
 *   <script type="module" src="/js/cookieconsent-config.js"></script>
 * 
 * Et modifier les scripts GA4 avec type="text/plain" data-cookiecategory="analytics"
 */

import * as CookieConsent from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

// ─── Catégories ───
const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";

// ─── Initialisation du dataLayer et gtag ───
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// Consentement par défaut : tout refusé (Loi 25 — opt-in obligatoire)
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
});

/**
 * Met à jour le consentement Google selon les choix de l'utilisateur
 */
function updateGtagConsent() {
    gtag('consent', 'update', {
        'analytics_storage': CookieConsent.acceptedCategory(CAT_ANALYTICS) ? 'granted' : 'denied',
    });
}

// ─── Thème sombre Club Touriste ───
const style = document.createElement('style');
style.textContent = `
    :root {
        --cc-bg: #1A1712;
        --cc-primary-color: #F0EAE0;
        --cc-secondary-color: #D5CDBF;
        --cc-btn-primary-bg: #C9A96E;
        --cc-btn-primary-color: #0F0D0A;
        --cc-btn-primary-hover-bg: #E8D5A3;
        --cc-btn-primary-hover-color: #0F0D0A;
        --cc-btn-secondary-bg: #2A2520;
        --cc-btn-secondary-color: #D5CDBF;
        --cc-btn-secondary-hover-bg: #3A3530;
        --cc-btn-secondary-hover-color: #F0EAE0;
        --cc-separator-border-color: rgba(201,169,110,0.25);
        --cc-cookie-category-block-bg: #231F1A;
        --cc-cookie-category-block-border: rgba(201,169,110,0.25);
        --cc-cookie-category-block-hover-bg: #2A2520;
        --cc-cookie-category-block-hover-border: rgba(201,169,110,0.35);
        --cc-cookie-category-expanded-block-hover-bg: #2A2520;
        --cc-cookie-category-expanded-block-bg: #231F1A;
        --cc-toggle-on-bg: #C9A96E;
        --cc-toggle-off-bg: #4A4540;
        --cc-toggle-readonly-bg: #3A3530;
        --cc-toggle-on-knob-bg: #0F0D0A;
        --cc-toggle-readonly-knob-bg: #231F1A;
        --cc-overlay-bg: rgba(15,13,10,0.85);
        --cc-footer-bg: #1A1712;
        --cc-footer-border-color: rgba(201,169,110,0.25);
    }
    #cc-main a { color: #C9A96E; }
    #cc-main a:hover { color: #E8D5A3; }
`;
document.head.appendChild(style);

// ─── Configuration principale ───
CookieConsent.run({

    mode: 'opt-in',

    cookie: {
        name: 'cc_cookie_ct',
        domain: location.hostname,
        path: '/',
        sameSite: 'Lax',
        expiresAfterDays: 182,
    },

    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false,
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false,
        }
    },

    onFirstConsent: () => { updateGtagConsent(); },
    onConsent: () => { updateGtagConsent(); },
    onChange: () => { updateGtagConsent(); },

    categories: {
        [CAT_NECESSARY]: {
            enabled: true,
            readOnly: true,
        },
        [CAT_ANALYTICS]: {
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' },
                ]
            },
            services: {
                'analytics_storage': {
                    label: 'Permet le stockage de données liées aux statistiques de visite (durée, pages consultées).',
                }
            }
        },
    },

    language: {
        default: 'fr',
        translations: {
            fr: {
                consentModal: {
                    title: 'Respect de votre vie privée',
                    description: 'Le Club Touriste utilise des témoins (cookies) essentiels au fonctionnement du site ainsi que des témoins d\'analyse pour comprendre votre utilisation. Ces derniers ne sont activés qu\'avec votre consentement.',
                    acceptAllBtn: 'Tout accepter',
                    acceptNecessaryBtn: 'Tout refuser',
                    showPreferencesBtn: 'Gérer mes préférences',
                },
                preferencesModal: {
                    title: 'Gestion des témoins',
                    acceptAllBtn: 'Tout accepter',
                    acceptNecessaryBtn: 'Tout refuser',
                    savePreferencesBtn: 'Enregistrer mes choix',
                    closeIconLabel: 'Fermer',
                    sections: [
                        {
                            title: 'Utilisation des témoins',
                            description: 'Conformément à la <strong>Loi 25 du Québec</strong> sur la protection des renseignements personnels, nous vous informons que ce site utilise des témoins de connexion (cookies). Vous pouvez accepter ou refuser chaque catégorie. Consultez notre <a href="/politique-de-confidentialite">politique de confidentialité</a> pour plus de détails.',
                        },
                        {
                            title: 'Témoins strictement nécessaires',
                            description: 'Ces témoins sont essentiels au fonctionnement du site (navigation, sécurité, préférences de consentement). Ils ne collectent aucune donnée personnelle à des fins de suivi.',
                            linkedCategory: CAT_NECESSARY,
                        },
                        {
                            title: 'Témoins d\'analyse (Google Analytics)',
                            description: 'Ces témoins nous permettent de mesurer la fréquentation du site et de comprendre comment les visiteurs l\'utilisent afin d\'améliorer votre expérience. Les données sont anonymisées.',
                            linkedCategory: CAT_ANALYTICS,
                            cookieTable: {
                                caption: 'Liste des témoins d\'analyse',
                                headers: {
                                    name: 'Nom',
                                    domain: 'Service',
                                    description: 'Description',
                                    expiration: 'Expiration',
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: 'Google Analytics',
                                        description: 'Identifiant unique anonyme pour distinguer les visiteurs.',
                                        expiration: '2 ans',
                                    },
                                    {
                                        name: '_gid',
                                        domain: 'Google Analytics',
                                        description: 'Identifiant unique anonyme pour la session en cours.',
                                        expiration: '24 heures',
                                    },
                                ],
                            },
                        },
                        {
                            title: 'Plus d\'informations',
                            description: 'Pour toute question relative à notre utilisation des témoins ou à vos droits, contactez notre responsable de la protection des renseignements personnels : <a href="mailto:security@bunkers.co">security@bunkers.co</a>.',
                        },
                    ],
                },
            },
        },
    },
});
