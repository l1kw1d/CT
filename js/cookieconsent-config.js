/**
 * Club Touriste — Configuration CookieConsent v3
 * Conforme à la Loi 25 du Québec
 *
 * VERSION CORRIGÉE — Avril 2026
 * 
 * Changement clé vs version précédente :
 * → GA4 n'est PLUS bloqué par data-cookiecategory.
 * → GA4 se charge toujours et respecte le Google Consent Mode v2.
 * → Sans consentement : pings cookieless anonymes (conformes Loi 25).
 * → Avec consentement : tracking complet.
 *
 * Ce fichier doit être placé dans /js/cookieconsent-config.js
 * Il doit être inclus sur CHAQUE page HTML du site (index, menu, midi, etc.)
 *
 * Dans le <head> de chaque page, ajouter :
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css">
 *   <script type="module" src="/js/cookieconsent-config.js"></script>
 *
 * Le tag GA4 reste un <script> normal (PAS de type="text/plain", PAS de data-cookiecategory)
 */

import * as CookieConsent from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

// ─── Catégories ───
const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";

// ─── Initialisation du dataLayer et gtag ───
// IMPORTANT : ce bloc doit s'exécuter AVANT le tag GA4 dans le HTML.
// CookieConsent étant en type="module", il est différé. C'est pour ça que
// le bloc gtag('consent', 'default', ...) doit ÉGALEMENT être inline dans
// le <head> de chaque page, AVANT le tag GA4 (voir guide HTML).
// On le redéfinit ici par sécurité au cas où le module se charge en premier.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

/**
 * Met à jour le consentement Google selon les choix de l'utilisateur.
 * GA4 bascule du mode "cookieless ping" au mode "tracking complet".
 */
function updateGtagConsent() {
    const analyticsGranted = CookieConsent.acceptedCategory(CAT_ANALYTICS);
    gtag('consent', 'update', {
        'analytics_storage': analyticsGranted ? 'granted' : 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
    });
}

// ─── Configuration CookieConsent ───
CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: 'box inline',
            position: 'bottom left',
            equalWeightButtons: true,
            flipButtons: false,
        },
        preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false,
        },
    },

    categories: {
        [CAT_NECESSARY]: {
            enabled: true,
            readOnly: true,
        },
        [CAT_ANALYTICS]: {
            enabled: false,
            readOnly: false,
            autoClear: {
                cookies: [
                    { name: /^_ga/ },
                    { name: '_gid' },
                ],
            },
        },
    },

    // Callbacks : déclenchés à chaque changement de consentement
    onFirstConsent: () => updateGtagConsent(),
    onConsent: () => updateGtagConsent(),
    onChange: () => updateGtagConsent(),

    language: {
        default: 'fr',
        translations: {
            fr: {
                consentModal: {
                    title: 'Nous respectons votre vie privée',
                    description: 'Nous utilisons des témoins de navigation pour mesurer la fréquentation du site et améliorer votre expérience. Conformément à la Loi 25 du Québec, votre consentement est requis. Vous pouvez modifier vos préférences en tout temps.',
                    acceptAllBtn: 'Tout accepter',
                    acceptNecessaryBtn: 'Refuser',
                    showPreferencesBtn: 'Gérer les préférences',
                    footer: '<a href="/confidentialite">Politique de confidentialité</a>',
                },
                preferencesModal: {
                    title: 'Préférences de confidentialité',
                    acceptAllBtn: 'Tout accepter',
                    acceptNecessaryBtn: 'Refuser',
                    savePreferencesBtn: 'Enregistrer mes préférences',
                    closeIconLabel: 'Fermer',
                    sections: [
                        {
                            title: 'Utilisation des témoins',
                            description: 'Nous utilisons des témoins de navigation pour assurer le bon fonctionnement de notre site et, avec votre consentement, pour mesurer son utilisation. Vous pouvez accepter, refuser ou personnaliser votre choix ci-dessous.',
                        },
                        {
                            title: 'Témoins strictement nécessaires',
                            description: 'Ces témoins sont indispensables au bon fonctionnement du site (navigation, sécurité, mémorisation de vos préférences de consentement). Ils ne collectent aucune donnée personnelle à des fins de suivi.',
                            linkedCategory: CAT_NECESSARY,
                        },
                        {
                            title: 'Témoins d\'analyse (Google Analytics)',
                            description: 'Ces témoins nous permettent de mesurer la fréquentation du site et de comprendre comment les visiteurs l\'utilisent afin d\'améliorer votre expérience. Sans votre consentement, seules des données anonymes et agrégées sont transmises (sans identifiant ni cookie persistant).',
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
                                        name: '_ga_*',
                                        domain: 'Google Analytics',
                                        description: 'Conserve l\'état de la session pour GA4.',
                                        expiration: '2 ans',
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
