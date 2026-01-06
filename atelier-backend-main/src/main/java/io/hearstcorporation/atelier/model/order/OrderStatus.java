package io.hearstcorporation.atelier.model.order;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderStatus {

    IN_CAD("In CAD"),
    PROTOTYPING("Prototyping"),
    AT_THE_CASTING("At the casting"),
    RECEIVED_FROM_CASTING("Received from casting"),
    IN_MOUNTING("In mounting"),
    IN_MOUNTING_BOX("In mounting box"),
    MOUNTING_COMPLETED("Mounting completed"),
    QC_MOUNTING("QC mounting"),
    IN_SETTING_BOX(("In setting box")),
    PREPPED_FOR_SETTING("Prepped for setting"),
    IN_SETTING("In setting"),
    SETTING_COMPLETED("Setting completed"),
    POLISHED("Polished"),
    QUALITY_CONTROL("Quality control"),
    QC_PASSED("QC passed"),
    READY_FOR_INVOICE("Ready for Invoice"),
    INVOICED("Invoiced"),
    READY_FOR_ASSAY("Ready for assay"),
    OUT_FOR_ASSAY("Out for assay"),
    ASSAY_COMPLETED("Assay completed"),
    FINISHED("Finished"),
    MASTER_PIECE_BOX("Master piece box"),
    REJECTED("Rejected"),
    IN_POLISHING("In polishing"),
    SAND_BLASTING("Sand blasting"),
    READY_TO_CASTING("Ready to Casting"),
    SENT_TO_ENAMEL("Sent to enamel"),
    RECYCLED("Recycled");

    private final String description;
}
