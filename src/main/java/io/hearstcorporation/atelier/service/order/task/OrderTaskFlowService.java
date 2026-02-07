package io.hearstcorporation.atelier.service.order.task;

import io.hearstcorporation.atelier.dto.model.LogTimeRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CadCompleteRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingStartRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.CastingWeightRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.PartBrokenRequestDto;
import io.hearstcorporation.atelier.dto.model.order.task.Printing3dCompleteRequestDto;

public interface OrderTaskFlowService {

    void startCad(Long orderTaskId);

    void startCadReview(Long orderTaskId, LogTimeRequestDto logTime);

    void completeCad(Long orderTaskId, CadCompleteRequestDto cadCompleteRequest);

    void restartCad(Long orderTaskId);

    void start3dPrinting(Long orderTaskId);

    void complete3dPrinting(Long orderTaskId, Printing3dCompleteRequestDto printing3dCompleteRequest);

    void startCasting(Long orderTaskId, CastingStartRequestDto castingStartRequest);

    void completeCasting(Long orderTaskId, CastingWeightRequestDto castingCompleteRequest);

    void partBroken(Long orderTaskId, PartBrokenRequestDto partBrokenRequest);
}
