namespace server.records;

public record EmailRequest(string To, string Subject, string Body);