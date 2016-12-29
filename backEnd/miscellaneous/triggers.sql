/* Trigger to Set Default Json Field to []*/
delimiter |
CREATE TRIGGER SetDefaultJsonField
BEFORE INSERT ON article
FOR EACH ROW 
BEGIN
    SET NEW.upVoters = '[]', NEW.downVoters = '[]';
END
|SetDefaultJsonField
delimiter ;

/*------------------------------------------------------------------------------------------*/
/* Trigger for updating vote count */
delimiter |
CREATE TRIGGER UpdateVoteCount
BEFORE UPDATE ON article
FOR EACH ROW 
BEGIN
    SET @UpVoteJsonArray = NEW.upVoters;
    SET @DownVoteJsonArray = NEW.downVoters;
	SET @NewUpvoteCount = (SELECT JSON_LENGTH(@UpVoteJsonArray));
    SET @NewDownvoteCount = (SELECT JSON_LENGTH(@DownVoteJsonArray));
    SET NEW.upvoteCount = @NewUpvoteCount, NEW.downvoteCount = @NewDownvoteCount;
END
|
delimiter ;
/*------------------------------------------------------------------------------------------*/
