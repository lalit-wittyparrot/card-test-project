import * as builder from "botbuilder";
import { TriggerActionDialog } from "../../../utils/TriggerActionDialog";
import { DialogIds } from "../../../utils/DialogIds";
import { DialogMatches } from "../../../utils/DialogMatches";
import { Strings } from "../../../locale/locale";
import * as teams from "botbuilder-teams";

export class O365ConnectorCardActionsDialog extends TriggerActionDialog {

    private static async step1(session: builder.Session, args?: any | builder.IDialogResult<any>, next?: (args?: builder.IDialogResult<any>) => void): Promise<void> {
        let choice = session.gettext(Strings.choice);

        // multiple choice examples
        let cardAction1 = new teams.O365ConnectorCardActionCard(session)
                            .id("cardAction-1")
                            .name(Strings.multiple_choice)
                            .inputs([
                                new teams.O365ConnectorCardMultichoiceInput(session)
                                    .id("list-1")
                                    .title(Strings.pick_multiple_options)
                                    .isMultiSelect(true)
                                    .isRequired(true)
                                    .style("expanded")
                                    .choices([
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 1").value("1"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 2").value("2"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 3").value("3"),
                                    ]),
                                new teams.O365ConnectorCardMultichoiceInput(session)
                                    .id("list-2")
                                    .title(Strings.pick_multiple_options)
                                    .isMultiSelect(true)
                                    .isRequired(true)
                                    .style("compact")
                                    .choices([
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 4").value("4"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 5").value("5"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " 6").value("6"),
                                    ]),
                                new teams.O365ConnectorCardMultichoiceInput(session)
                                    .id("list-3")
                                    .title(Strings.pick_an_option)
                                    .isMultiSelect(false)
                                    .style("expanded")
                                    .choices([
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " a").value("a"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " b").value("b"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " c").value("c"),
                                    ]),
                                new teams.O365ConnectorCardMultichoiceInput(session)
                                    .id("list-4")
                                    .title(Strings.pick_an_option)
                                    .isMultiSelect(false)
                                    .style("compact")
                                    .choices([
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " x").value("x"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " y").value("y"),
                                        new teams.O365ConnectorCardMultichoiceInputChoice(session).display(choice + " z").value("z"),
                                    ]),
                            ])
                            .actions([
                                new teams.O365ConnectorCardHttpPOST(session)
                                    .id("cardAction-1-btn-1")
                                    .name(Strings.send)
                                    .body(JSON.stringify({
                                        list1: "{{list-1.value}}",
                                        list2: "{{list-2.value}}",
                                        list3: "{{list-3.value}}",
                                        list4: "{{list-4.value}}",
                                    })),
                            ]);

        // text input examples
        let cardAction2 = new teams.O365ConnectorCardActionCard(session)
                            .id("cardAction-2")
                            .name(Strings.text_input)
                            .inputs([
                                new teams.O365ConnectorCardTextInput(session)
                                    .id("text-1")
                                    .title(Strings.multiline_no_max)
                                    .isMultiline(true),
                                new teams.O365ConnectorCardTextInput(session)
                                    .id("text-2")
                                    .title(Strings.singleline_no_max)
                                    .isMultiline(false),
                                new teams.O365ConnectorCardTextInput(session)
                                    .id("text-3")
                                    .title(Strings.multiline_max_ten)
                                    .isMultiline(true)
                                    .isRequired(true)
                                    .maxLength(10),
                                new teams.O365ConnectorCardTextInput(session)
                                    .id("text-4")
                                    .title(Strings.singleline_max_ten)
                                    .isMultiline(false)
                                    .isRequired(true)
                                    .maxLength(10),
                            ])
                            .actions([
                                new teams.O365ConnectorCardHttpPOST(session)
                                    .id("cardAction-2-btn-1")
                                    .name(Strings.send)
                                    .body(JSON.stringify({
                                        text1: "{{text-1.value}}",
                                        text2: "{{text-2.value}}",
                                        text3: "{{text-3.value}}",
                                        text4: "{{text-4.value}}",
                                    })),
                            ]);

        // date / time input examples
        let cardAction3 = new teams.O365ConnectorCardActionCard(session)
                            .id("cardAction-3")
                            .name(Strings.date_input)
                            .inputs([
                                new teams.O365ConnectorCardDateInput(session)
                                    .id("date-1")
                                    .title(Strings.date_with_time)
                                    .includeTime(true)
                                    .isRequired(true),
                                new teams.O365ConnectorCardDateInput(session)
                                    .id("date-2")
                                    .title(Strings.date_only)
                                    .includeTime(false)
                                    .isRequired(false),
                            ])
                            .actions([
                                new teams.O365ConnectorCardHttpPOST(session)
                                    .id("cardAction-3-btn-1")
                                    .name(Strings.send)
                                    .body(JSON.stringify({
                                        date1: "{{date-1.value}}",
                                        date2: "{{date-2.value}}",
                                    })),
                            ]);

        let section = new teams.O365ConnectorCardSection(session)
                        .markdown(true)
                        .title(Strings.section_title)
                        .text(Strings.section_text)
                        .activityTitle(Strings.activity_title)
                        .activitySubtitle(Strings.activity_subtitle)
                        .activityImage("http://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg")
                        .activityText(Strings.activity_text)
                        .facts([
                            new teams.O365ConnectorCardFact(session).name(Strings.fact_name_1).value(Strings.fact_value_1),
                            new teams.O365ConnectorCardFact(session).name(Strings.fact_name_2).value(Strings.fact_value_2),
                        ])
                        .images([
                            new teams.O365ConnectorCardImage(session).title(Strings.image_one).image("http://connectorsdemo.azurewebsites.net/images/WIN12_Anthony_02.jpg"),
                            new teams.O365ConnectorCardImage(session).title(Strings.image_two).image("http://connectorsdemo.azurewebsites.net/images/WIN12_Scene_01.jpg"),
                            new teams.O365ConnectorCardImage(session).title(Strings.image_three).image("http://connectorsdemo.azurewebsites.net/images/WIN12_Anthony_02.jpg"),
                        ]);

        let card = new teams.O365ConnectorCard(session)
                        .summary(Strings.o365_card_summary)
                        .themeColor("#E67A9E")
                        .title(Strings.card_title)
                        .text(Strings.card_text)
                        .sections([section])
                        .potentialAction([
                            cardAction1,
                            cardAction2,
                            cardAction3,
                            new teams.O365ConnectorCardViewAction(session)
                                .name(Strings.view_action)
                                .target("http://microsoft.com"),
                            new teams.O365ConnectorCardOpenUri(session)
                                .id("open-uri")
                                .name(Strings.open_uri)
                                .default("http://microsoft.com")
                                .iOS("http://microsoft.com")
                                .android("http://microsoft.com")
                                .windowsPhone("http://microsoft.com"),
                        ]);

        let msg = new teams.TeamsMessage(session)
                    .summary(Strings.message_summary)
                    .attachments([card]);

        session.send(msg);
        session.endDialog();
    }

    constructor(
        bot: builder.UniversalBot,
    ) {
        super(bot,
            DialogIds.O365ConnectorCardActionsDialogId,
            DialogMatches.O365ConnectorCardActionsDialogMatch,
            O365ConnectorCardActionsDialog.step1,
        );
    }
}
